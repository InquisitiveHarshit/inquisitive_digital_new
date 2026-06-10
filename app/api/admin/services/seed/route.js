import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

// Import all service data
import { seoData } from "@/app/services/data/seo";
import { performanceMarketingData } from "@/app/services/data/performance-marketing";
import { contentMarketingData } from "@/app/services/data/content-marketing";
import { socialMediaData } from "@/app/services/data/social-media";
import { webDevelopmentData } from "@/app/services/data/web-development";
import { creativeServicesData } from "@/app/services/data/creative-services";
import { sitemapState } from "@/lib/sitemapCache";

export async function GET(request) {
  try {
    await connectDB();
    
    // We replace the icon components with string names that can be saved in MongoDB
    const servicesToSeed = [
      { ...seoData, icon: "Search" },
      { ...performanceMarketingData, icon: "TrendingUp" },
      { ...contentMarketingData, icon: "FileText" },
      { ...socialMediaData, icon: "Share2" },
      { ...webDevelopmentData, icon: "Code" },
      { ...creativeServicesData, icon: "Palette" }
    ];

    const results = [];

    for (let index = 0; index < servicesToSeed.length; index++) {
      const data = servicesToSeed[index];
      
      // Destructure the TS-specific field names and map them to MongoDB schema field names
      const { id, shortDesc, detailedDesc, ...rest } = data;
      const slug = id;

      // Upsert the service (update if exists, insert if new)
      const updatedService = await Service.findOneAndUpdate(
        { slug: slug },
        { 
          $set: { 
            ...rest, 
            slug: slug,
            shortDescription: shortDesc,
            description: detailedDesc,
            order: index + 1
          }
        },
        { new: true, upsert: true, runValidators: true }
      );
      
      results.push(updatedService);
    }


    // Invalidate the sitemap cache so it gets rebuilt with the new data
    sitemapState.bust();

    return NextResponse.json({ 
      success: true, 
      message: "Services seeded successfully to MongoDB", 
      count: results.length 
    });
  } catch (err) {
    console.error("[ERROR] Seed Services:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
