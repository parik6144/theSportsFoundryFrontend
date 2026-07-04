#!/bin/bash
BASE="/home/z/my-project/src/app/api"

# Helper to create list route (GET all + POST create)
create_list_route() {
    local model="$1"
    local dir="$2"
    cat > "$BASE/$dir/route.ts" << EOF
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const records = await db.${model}.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ success: true, data: records });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const record = await db.${model}.create({ data: body });
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
EOF
}

# Helper to create by-id route (GET one + PUT update + DELETE)
create_id_route() {
    local model="$1"
    local dir="$2"
    mkdir -p "$BASE/$dir/[id]"
    cat > "$BASE/$dir/[id]/route.ts" << EOF
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const record = await db.${model}.findUnique({ where: { id } });
    if (!record) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: record });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const record = await db.${model}.update({ where: { id }, data: body });
    return NextResponse.json({ success: true, data: record });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.${model}.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
EOF
}

# Generate all routes
create_list_route "user" "users"
create_id_route "user" "users"

create_list_route "service" "services"
create_id_route "service" "services"

create_list_route "athlete" "athletes"
create_id_route "athlete" "athletes"

create_list_route "team" "teams"
create_id_route "team" "teams"

create_list_route "academy" "academies"
create_id_route "academy" "academies"

create_list_route "brand" "brands"
create_id_route "brand" "brands"

create_list_route "event" "events"
create_id_route "event" "events"

create_list_route "blogPost" "blog-posts"
create_id_route "blogPost" "blog-posts"

create_list_route "successStory" "success-stories"
create_id_route "successStory" "success-stories"

create_list_route "testimonial" "testimonials"
create_id_route "testimonial" "testimonials"

create_list_route "partner" "partners"
create_id_route "partner" "partners"

create_list_route "communityPost" "community-posts"
create_id_route "communityPost" "community-posts"

create_list_route "enquiry" "enquiries"
create_id_route "enquiry" "enquiries"

create_list_route "role" "roles"
create_id_route "role" "roles"

echo "All API routes created"
ls -la $BASE/*/route.ts 2>/dev/null | wc -l
ls -la $BASE/*/[id]/route.ts 2>/dev/null | wc -l
