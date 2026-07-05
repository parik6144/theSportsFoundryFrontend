#!/usr/bin/env bash
# The Sports Foundry — Next.js only EC2 setup (Ubuntu 22.04 / 24.04)
# Run: PUBLIC_IP=13.50.4.113 DATABASE_URL='mysql://...' bash aws-setup.sh

set -euo pipefail

PUBLIC_IP="${PUBLIC_IP:-13.50.4.113}"
DB_NAME="${DB_NAME:-db_thesportsfoundry}"
DB_USER="${DB_USER:-sportsphere}"
DB_PASS="${DB_PASS:-SportSphere@2026}"
APP_DIR="${APP_DIR:-/var/www/sportsphere-frontend}"
LOG_FILE="${LOG_FILE:-/home/ubuntu/aws-setup.log}"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "============================================"
echo " Next.js deploy — $(date -Is)"
echo " PUBLIC_IP=$PUBLIC_IP"
echo " APP_DIR=$APP_DIR"
echo "============================================"

if [ ! -f /swapfile ]; then
  echo "==> Adding 2GB swap..."
  sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi

echo "==> Installing packages..."
sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nginx mysql-server git curl

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

echo "==> Configuring MySQL..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "ALTER USER '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

DATABASE_URL="${DATABASE_URL:-mysql://${DB_USER}:${DB_PASS}@127.0.0.1:3306/${DB_NAME}}"

echo "==> Cloning app..."
sudo mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  sudo rm -rf "$APP_DIR"
  sudo git clone https://github.com/parik6144/theSportsFoundryFrontend.git "$APP_DIR"
fi
sudo chown -R ubuntu:ubuntu "$APP_DIR"

cd "$APP_DIR"
git pull origin main || true

cat > .env <<ENV
DATABASE_URL="${DATABASE_URL}"
ENV

export NODE_OPTIONS="--max-old-space-size=2048"
npm ci || npm install
npx prisma generate
npx prisma db push --accept-data-loss
npm run build

pm2 delete sportsphere-frontend 2>/dev/null || true
pm2 start npm --name sportsphere-frontend -- start
pm2 save

echo "==> Nginx..."
sudo tee /etc/nginx/sites-available/sportsphere >/dev/null <<NGINX
server {
    listen 80 default_server;
    server_name _;
    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/sportsphere /etc/nginx/sites-enabled/sportsphere
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx mysql
sudo systemctl reload nginx

PM2_STARTUP=$(pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>/dev/null | tail -1 || true)
[ -n "$PM2_STARTUP" ] && eval "$PM2_STARTUP" || true

echo ""
echo "============================================"
echo "  DEPLOYMENT COMPLETE"
echo "  Site:  http://${PUBLIC_IP}"
echo "  Admin: http://${PUBLIC_IP}/admin"
echo "  Log:   ${LOG_FILE}"
echo "============================================"
