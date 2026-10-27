import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";

/**
 * GET /api/admin/cities
 * Returns a flattened list of all cities across all services and countries,
 * along with serviceOptions and countryOptions for quick filtering and dropdowns.
 */
export async function GET(request) {
  try {
    await connectDB();

    const services = await Service.find({ isActive: true })
      .select("_id title slug locations")
      .sort({ order: 1, title: 1 })
      .lean();

    const cities = [];
    const serviceOptions = [];
    const countryOptions = {};

    for (const service of services) {
      const sId = service._id.toString();
      serviceOptions.push({
        _id: sId,
        title: service.title,
        slug: service.slug,
      });

      // Use DB locations if present, otherwise initialize empty
      const locations = Array.isArray(service.locations) ? service.locations : [];

      countryOptions[sId] = locations.map((c) => ({
        name: c.name,
        slug: c.slug,
        flag: c.flag || "🌐",
      }));

      for (const country of locations) {
        if (!Array.isArray(country.cities)) continue;
        for (const city of country.cities) {
          cities.push({
            id: `${sId}_${country.slug}_${city.slug}`,
            serviceId: sId,
            serviceSlug: service.slug,
            serviceTitle: service.title,
            countrySlug: country.slug,
            countryName: country.name,
            countryFlag: country.flag || "🌐",
            name: city.name,
            slug: city.slug,
            imageUrl: city.imageUrl || "",
            description: city.description || "",
            headline: city.headline || "",
            popularServices: Array.isArray(city.popularServices) ? city.popularServices : [],
            seoTitle: city.seoTitle || "",
            seoDescription: city.seoDescription || "",
            faqs: Array.isArray(city.faqs) ? city.faqs : [],
            sections: city.sections || [],
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      cities,
      serviceOptions,
      countryOptions,
    });
  } catch (err) {
    console.error("[ERROR] GET /api/admin/cities:", err.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/cities
 * Body: { serviceId, countrySlug, newCountryName?, newCountryFlag?, name, slug, description, headline, popularServices, seoTitle, seoDescription, faqs, sections }
 */
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      serviceId,
      countrySlug,
      newCountryName,
      newCountryFlag,
      name,
      slug,
      imageUrl = "",
      description = "",
      headline = "",
      popularServices = [],
      seoTitle = "",
      seoDescription = "",
      faqs = [],
      sections = [],
    } = body;

    if (!serviceId) {
      return NextResponse.json({ success: false, message: "Service is required" }, { status: 400 });
    }
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "City name is required" }, { status: 400 });
    }
    if (!slug || !slug.trim()) {
      return NextResponse.json({ success: false, message: "City slug is required" }, { status: 400 });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    if (!Array.isArray(service.locations)) {
      service.locations = [];
    }

    // Find country
    let targetCountry = service.locations.find(
      (c) => c.slug.toLowerCase() === (countrySlug || "").toLowerCase()
    );

    // If country not found but newCountryName provided
    if (!targetCountry && newCountryName && newCountryName.trim()) {
      const genCountrySlug = (countrySlug || newCountryName.toLowerCase().replace(/\s+/g, "-")).trim();
      targetCountry = {
        name: newCountryName.trim(),
        slug: genCountrySlug,
        flag: newCountryFlag || "🌐",
        description: "",
        cities: [],
      };
      service.locations.push(targetCountry);
    }

    if (!targetCountry) {
      return NextResponse.json(
        { success: false, message: "Country not found for this service. Please select a valid country or specify a new one." },
        { status: 400 }
      );
    }

    if (!Array.isArray(targetCountry.cities)) {
      targetCountry.cities = [];
    }

    // Check duplicate slug in same country
    const existingIndex = targetCountry.cities.findIndex(
      (c) => c.slug.toLowerCase() === slug.trim().toLowerCase()
    );

    const cityData = {
      name: name.trim(),
      slug: slug.trim(),
      imageUrl: (imageUrl || "").trim(),
      description: description.trim(),
      headline: headline.trim(),
      popularServices: Array.isArray(popularServices) ? popularServices.filter(Boolean) : [],
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      faqs: Array.isArray(faqs) ? faqs : [],
      sections: Array.isArray(sections) ? sections : [],
    };

    if (existingIndex >= 0) {
      targetCountry.cities[existingIndex] = cityData;
    } else {
      targetCountry.cities.push(cityData);
    }

    service.markModified("locations");
    await service.save();

    // Revalidate paths
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath(`/services/${service.slug}/${targetCountry.slug}`);
    revalidatePath(`/services/${service.slug}/${targetCountry.slug}/${slug.trim()}`);

    return NextResponse.json({
      success: true,
      message: "City saved successfully",
      data: {
        id: `${service._id}_${targetCountry.slug}_${cityData.slug}`,
        serviceId: service._id.toString(),
        serviceSlug: service.slug,
        serviceTitle: service.title,
        countrySlug: targetCountry.slug,
        countryName: targetCountry.name,
        countryFlag: targetCountry.flag || "🌐",
        ...cityData,
      },
    });
  } catch (err) {
    console.error("[ERROR] POST /api/admin/cities:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/cities
 * Updates an existing city.
 */
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      serviceId,
      countrySlug,
      originalSlug,
      name,
      slug,
      imageUrl = "",
      description = "",
      headline = "",
      popularServices = [],
      seoTitle = "",
      seoDescription = "",
      faqs = [],
      sections = [],
    } = body;

    if (!serviceId || !countrySlug || !name || !slug) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    const targetCountry = (service.locations || []).find(
      (c) => c.slug.toLowerCase() === countrySlug.toLowerCase()
    );

    if (!targetCountry || !Array.isArray(targetCountry.cities)) {
      return NextResponse.json({ success: false, message: "Country not found" }, { status: 404 });
    }

    const searchSlug = (originalSlug || slug).toLowerCase();
    const cityIndex = targetCountry.cities.findIndex(
      (c) => c.slug.toLowerCase() === searchSlug
    );

    if (cityIndex === -1) {
      return NextResponse.json({ success: false, message: "City not found in this country" }, { status: 404 });
    }

    const updatedCity = {
      name: name.trim(),
      slug: slug.trim(),
      imageUrl: (imageUrl || "").trim(),
      description: description.trim(),
      headline: headline.trim(),
      popularServices: Array.isArray(popularServices) ? popularServices.filter(Boolean) : [],
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      faqs: Array.isArray(faqs) ? faqs : [],
      sections: Array.isArray(sections) ? sections : [],
    };

    targetCountry.cities[cityIndex] = updatedCity;

    service.markModified("locations");
    await service.save();

    // Revalidate paths
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath(`/services/${service.slug}/${targetCountry.slug}`);
    revalidatePath(`/services/${service.slug}/${targetCountry.slug}/${slug.trim()}`);
    if (originalSlug && originalSlug !== slug.trim()) {
      revalidatePath(`/services/${service.slug}/${targetCountry.slug}/${originalSlug}`);
    }

    return NextResponse.json({
      success: true,
      message: "City updated successfully",
      data: {
        id: `${service._id}_${targetCountry.slug}_${updatedCity.slug}`,
        serviceId: service._id.toString(),
        serviceSlug: service.slug,
        serviceTitle: service.title,
        countrySlug: targetCountry.slug,
        countryName: targetCountry.name,
        countryFlag: targetCountry.flag || "🌐",
        ...updatedCity,
      },
    });
  } catch (err) {
    console.error("[ERROR] PUT /api/admin/cities:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/cities
 * Body or query params: { serviceId, countrySlug, citySlug }
 */
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    let serviceId = searchParams.get("serviceId");
    let countrySlug = searchParams.get("countrySlug");
    let citySlug = searchParams.get("citySlug");

    if (!serviceId || !countrySlug || !citySlug) {
      try {
        const body = await request.json();
        serviceId = body.serviceId || serviceId;
        countrySlug = body.countrySlug || countrySlug;
        citySlug = body.citySlug || citySlug;
      } catch {
        // no body
      }
    }

    if (!serviceId || !countrySlug || !citySlug) {
      return NextResponse.json(
        { success: false, message: "serviceId, countrySlug, and citySlug are required" },
        { status: 400 }
      );
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    const targetCountry = (service.locations || []).find(
      (c) => c.slug.toLowerCase() === countrySlug.toLowerCase()
    );

    if (!targetCountry || !Array.isArray(targetCountry.cities)) {
      return NextResponse.json({ success: false, message: "Country not found" }, { status: 404 });
    }

    const beforeCount = targetCountry.cities.length;
    targetCountry.cities = targetCountry.cities.filter(
      (c) => c.slug.toLowerCase() !== citySlug.toLowerCase()
    );

    if (targetCountry.cities.length === beforeCount) {
      return NextResponse.json({ success: false, message: "City not found" }, { status: 404 });
    }

    service.markModified("locations");
    await service.save();

    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath(`/services/${service.slug}/${targetCountry.slug}`);

    return NextResponse.json({
      success: true,
      message: `City "${citySlug}" deleted successfully`,
    });
  } catch (err) {
    console.error("[ERROR] DELETE /api/admin/cities:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
