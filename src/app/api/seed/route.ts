import { NextResponse } from "next/server";
import { backendGet } from "@/lib/backend";

export async function GET() {
  try {
    const home = (await backendGet("/home")) as {
      services?: unknown[];
      partners?: unknown[];
      testimonials?: unknown[];
    };
    return NextResponse.json({
      success: true,
      message: "Using shared MySQL database db_thesportsfoundry via Laravel API",
      data: {
        services: Array.isArray(home?.services) ? home.services.length : 0,
        partners: Array.isArray(home?.partners) ? home.partners.length : 0,
        testimonials: Array.isArray(home?.testimonials) ? home.testimonials.length : 0,
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
