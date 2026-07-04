#!/bin/bash
set -e
BASE="/home/z/my-project/download/sportsphere-backend"
cd "$BASE"

cat > composer.json << 'JSONEOF'
{
  "name": "sportsphere/backend",
  "type": "project",
  "description": "SportSphere Backend (Laravel 10 + Filament 3)",
  "license": "MIT",
  "require": {
    "php": "^8.1",
    "filament/filament": "^3.2",
    "filament/spatie-laravel-media-library-plugin": "^3.2",
    "filament/spatie-laravel-settings-plugin": "^3.2",
    "laravel/framework": "^10.45",
    "laravel/sanctum": "^3.3",
    "laravel/tinker": "^2.9",
    "spatie/laravel-medialibrary": "^11.0",
    "spatie/laravel-permission": "^6.4",
    "spatie/laravel-settings": "^3.3",
    "spatie/laravel-sluggable": "^3.4"
  },
  "require-dev": {
    "fakerphp/faker": "^1.23",
    "laravel/pint": "^1.13",
    "mockery/mockery": "^1.6",
    "nunomaduro/collision": "^7.10",
    "phpunit/phpunit": "^10.5",
    "spatie/laravel-ignition": "^2.4"
  },
  "autoload": { "psr-4": { "App\\": "app/", "Database\\Factories\\": "database/factories/", "Database\\Seeders\\": "database/seeders/" } },
  "autoload-dev": { "psr-4": { "Tests\\": "tests/" } },
  "scripts": {
    "post-autoload-dump": ["Illuminate\\Foundation\\ComposerScripts::postAutoloadDump", "@php artisan package:discover --ansi"],
    "post-update-cmd": ["@php artisan vendor:publish --tag=laravel-assets --ansi --force", "@php artisan filament:upgrade"]
  },
  "config": { "optimize-autoloader": true, "preferred-install": "dist", "sort-packages": true },
  "minimum-stability": "stable",
  "prefer-stable": true
}
JSONEOF

cat > .env.example << 'EOF'
APP_NAME=SportSphere
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=Asia/Kolkata
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8000
LOG_CHANNEL=stack
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sportsphere
DB_USERNAME=root
DB_PASSWORD=
SESSION_DRIVER=database
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
CACHE_STORE=database
CACHE_PREFIX=sportsphere_cache_
FILAMENT_PATH=admin
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@sportsphere.app
ADMIN_PASSWORD=Password#123
EOF

cat > artisan << 'EOF'
#!/usr/bin/env php
<?php
use Illuminate\Foundation\Application;
define('LARAVEL_START', microtime(true));
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
exit($app->handleCommand(new Symfony\Component\Console\Input\ArgvInput));
EOF
chmod +x artisan

cat > bootstrap/app.php << 'EOF'
<?php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(web: __DIR__.'/../routes/web.php', api: __DIR__.'/../routes/api.php', commands: __DIR__.'/../routes/console.php', health: '/up', apiPrefix: 'api/v1')
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class]);
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
        ]);
        $middleware->validateCsrfTokens(except: ['api/*', 'admin/*']);
    })
    ->withExceptions(function (Exceptions $e) {})->create();
EOF

cat > bootstrap/providers.php << 'EOF'
<?php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    App\Providers\AdminPanelProvider::class,
    App\Providers\EventServiceProvider::class,
    App\Providers\RouteServiceProvider::class,
];
EOF

cat > public/index.php << 'EOF'
<?php
use Illuminate\Http\Request;
define('LARAVEL_START', microtime(true));
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) { require $maintenance; }
require __DIR__.'/../vendor/autoload.php';
(require_once __DIR__.'/../bootstrap/app.php')->handleRequest(Request::capture());
EOF

cat > public/robots.txt << 'EOF'
User-agent: *
Disallow:
EOF

cat > public/logo.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#0a1128"/><text x="50" y="65" font-family="sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="#d4af37">SS</text></svg>
EOF

mkdir -p resources/css resources/js resources/views
cat > resources/css/app.css << 'EOF'
.fi-sidebar { background: linear-gradient(180deg, #0d1b3d 0%, #0a1128 100%) !important; }
.fi-brand { background: linear-gradient(135deg, #f4d35e, #d4af37); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
EOF
echo "import './bootstrap';" > resources/js/app.js
cat > resources/js/bootstrap.js << 'EOF'
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
EOF

cat > resources/views/welcome.blade.php << 'EOF'
<!DOCTYPE html><html><head><title>SportSphere API</title><style>body{font-family:system-ui;background:#0a1128;color:#e8edf5;margin:0;padding:40px;text-align:center}a{color:#d4af37}</style></head><body><h1>SportSphere API</h1><p>Backend running.</p><p><a href="/admin">Admin Panel</a> | <a href="/api/v1/home">API</a></p><p style="color:#9aa5ba">Login: admin@sportsphere.app / Password#123</p></body></html>
EOF

cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
export default defineConfig({ plugins: [laravel({ input: ['resources/css/app.css', 'resources/js/app.js'], refresh: true })] });
EOF

cat > package.json << 'EOF'
{ "private": true, "type": "module", "scripts": { "dev": "vite", "build": "vite build" }, "devDependencies": { "laravel-vite-plugin": "^1.0.0", "vite": "^5.0.0" } }
EOF

cat > phpunit.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php" colors="true">
  <testsuites><testsuite name="Unit"><directory>tests/Unit</directory></testsuite></testsuites>
  <php><env name="APP_ENV" value="testing"/><env name="DB_CONNECTION" value="sqlite"/><env name="DB_DATABASE" value=":memory:"/></php>
</phpunit>
EOF

cat > .gitignore << 'EOF'
/node_modules
/vendor
.env
storage/*.key
.phpunit.result.cache
*.db
.DS_Store
EOF

echo "Phase 1 done: root files"
