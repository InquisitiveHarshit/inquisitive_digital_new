import { Database } from "lucide-react";
import { ServiceFullDetail } from "../types";

export const dataEngineeringData: ServiceFullDetail = {
  id: "data-engineering",
  title: "Data Engineering Services",
  category: "Data & AI",
  shortDesc: "We design reliable pipelines, cut cloud processing costs, migrate legacy platforms safely and keep your data trustworthy, so your teams get accurate data on time.",
  detailedDesc: "Inquisitive Digital's data engineering team helps you fix your data platform at the structural level. We optimise the jobs you already run, automate how they are scheduled and monitored, migrate old systems without breaking reports, document who owns which data, and validate quality automatically. We also build AI assistants that let your teams find answers in internal documentation without waiting on someone else.",
  icon: Database,
  deliverables: [
    "Platform and Pipeline Performance Assessment",
    "Spark Job Tuning & SQL Query Cost Optimisation",
    "Apache Airflow Workflow Orchestration & CI/CD",
    "Zero-Downtime Platform Modernisation & Safe Migration",
    "Automated Data Quality Checks & Data Contracts",
    "Data Governance, Metadata Cataloguing & Lineage Integration",
    "Enterprise RAG AI Agents & Support Chatbots",
  ],
  ctaText: "Book a Free Data Platform Review",
  painPoints: [
    "Pipelines miss their deadlines — jobs run late and business SLAs are at risk.",
    "Cloud costs keep rising — compute is over-provisioned or queries and Spark jobs are inefficient.",
    "Workflows are fragile — scheduling is manual or scattered and failures are noticed late.",
    "Legacy platforms are hard to move — you need to migrate, but fear downtime and broken reports.",
    "Bad data reaches dashboards — issues are found by business users instead of your pipelines.",
    "Knowledge is hard to find — engineers keep answering repeat questions because documentation is buried.",
  ],
  benefits: [
    "Accelerate data pipeline execution and guarantee strict business SLAs.",
    "Dramatically reduce cloud compute and data warehouse infrastructure spend.",
    "Eliminate silent failures with automated alerts, data contracts, and lineage.",
    "Safely migrate legacy platforms with parallel runs and zero downtime.",
    "Empower your engineering and analytics teams with self-service AI documentation assistants.",
  ],
  faq: [
    {
      q: "What does your data engineering team actually do?",
      a: "We build, optimise and maintain the systems that move and prepare data: pipelines, orchestration, migrations, quality checks, governance and AI assistants over internal knowledge.",
    },
    {
      q: "Can you reduce our cloud costs?",
      a: "Often, yes, by tuning Spark jobs, optimising SQL and right-sizing resources. The size of the saving depends on your current setup, so we measure first and share findings before changing anything.",
    },
    {
      q: "How do you migrate without breaking our reports?",
      a: "We discover workloads first, run old and new systems in parallel, validate outputs automatically, cut over in phases and keep a rollback plan ready.",
    },
    {
      q: "Do you only work with Apache Airflow?",
      a: "Airflow is one of our core orchestration skills. We also work across other orchestration platforms, especially when planning migrations between them.",
    },
    {
      q: "What are data contracts and why do they matter?",
      a: "A data contract is an agreed definition of what a dataset should look like, such as its schema and freshness. Checking it automatically stops broken data from silently reaching downstream users.",
    },
    {
      q: "What is an enterprise RAG assistant?",
      a: "It is an AI assistant that finds relevant information in your own documentation and knowledge sources and uses it to answer questions, for example in Slack or an internal portal.",
    },
    {
      q: "Can our team take over after you finish?",
      a: "Yes. We build reusable components, document the work and run a handover session so your team can operate and extend it.",
    },
    {
      q: "How long does a project take and what does it cost?",
      a: "Both depend on the number of pipelines, systems and integrations involved. After an initial review, we share a clear plan, timeline and itemised estimate.",
    },
  ],
  heroSection: {
    ctaText1: "Book a Free Review",
    ctaText2: "Explore Approach",
  },
  approachSection: {
    tag: "THE APPROACH",
    heading: "How We Make Data Platforms Dependable, Scalable & Cost-Effective",
    mainDescription: "As data volumes grow, pipelines slow down, cloud bills climb and nobody is fully sure where a number came from. Most data teams spend more time fixing and explaining pipelines than building new value from data. Inquisitive Digital's data engineering team helps you fix this at the platform level.",
    secondaryDescription: "We optimise the jobs you already run, automate how they are scheduled and monitored, migrate old systems without breaking reports, document who owns which data, and validate quality automatically. We also build AI assistants that let your teams find answers in internal documentation without waiting on someone else. Technologies we work with include Apache Spark, SQL, Apache Airflow, CI/CD pipelines, cloud data warehouses & compute, metadata catalogues, lineage tools, Slack integrations, and REST APIs.",
    pills: [
      { title: "Engineering-First", desc: "Measurement and root cause analysis, not guesswork." },
      { title: "Safe Migrations", desc: "Parallel runs, automated validation and rollback plans built in." },
      { title: "Built to Be Owned", desc: "Reusable components, documentation and self-service onboarding." },
    ],
  },
  deliverablesSection: {
    tag: "WHAT YOU GET",
    heading: "What You Get in Every Engagement",
    items: [
      "Platform and pipeline assessment with prioritised findings",
      "Written scope, architecture and implementation plan",
      "Hands-on implementation by experienced data engineers",
      "Automated validation and monitoring for what we deliver",
      "Documentation and a handover session for your team",
      "Post-delivery support as defined in the proposal",
    ],
    itemSubtext: "Engineered to deliver high performance, cost savings, and operational peace of mind.",
    guaranteeText: "Every single engagement includes transparent reporting, a dedicated technical lead, automated validation, and comprehensive post-delivery handover sessions.",
    guaranteeCtaText: "Book a Free Review",
  },
  inactionSection: {
    tag: "WHAT INACTION COSTS YOU",
    heading: "The Price of Fragile Data Infrastructure",
    painPoints: [
      {
        title: "Pipelines miss deadlines & business SLAs are at risk",
        desc: "Delayed batch jobs force executives to make critical decisions on stale metrics while engineers spend mornings firefighting.",
      },
      {
        title: "Cloud infrastructure costs keep climbing unchecked",
        desc: "Over-provisioned compute clusters and unoptimised Spark jobs quietly drain tens of thousands of dollars from budgets.",
      },
      {
        title: "Bad data silently corrupts dashboards and models",
        desc: "Without data contracts and automated validation, errors are caught by frustrated business stakeholders instead of your systems.",
      },
    ],
  },
  leadFormSection: {
    tag: "FREE PLATFORM REVIEW",
    heading: "Ready to Make Your Data Platform Faster, Cheaper and More Reliable?",
    benefits: [
      {
        title: "Platform & Pipeline Assessment",
        desc: "Our senior data engineers evaluate your architecture, query efficiency, and compute bottlenecks.",
      },
      {
        title: "Itemised Cost-Cutting & Migration Plan",
        desc: "Receive clear, phased recommendations to eliminate waste and modernize workflows without downtime.",
      },
      {
        title: "Practical Next Steps — Zero Commitments",
        desc: "Walk away with an actionable technical plan tailored to your team's tech stack and timeline.",
      },
    ],
  },
  statsSection: {
    tag: "BY THE NUMBERS",
    heading: "Why Data Platform Optimization Matters",
    stats: [
      {
        value: "40%+",
        label: "Average reduction in cloud data processing and warehouse compute costs through query & Spark tuning",
        source: "Industry Benchmarks",
      },
      {
        value: "99.9%",
        label: "Data pipeline reliability achieved with automated quality contracts and proactive alerts",
        source: "Gartner",
      },
    ],
  },
  whatIsSection: {
    tag: "WHAT IS DATA ENGINEERING",
    heading: "Data Engineering & AI Platforms Explained",
    description: "Data Engineering is the discipline of designing, building, and maintaining the infrastructure and pipelines that move, transform, and govern data across your business. A modern data platform ensures your analytics, BI dashboards, and AI models receive accurate, fresh, and trustworthy data on time.",
    secondaryDescription: "Modern data engineering goes far beyond basic batch scripts. It encompasses automated workflow orchestration with Apache Airflow, Spark cost tuning, data quality contracts, metadata cataloguing, zero-downtime cloud warehouse migrations, and enterprise RAG agents that connect your team with organizational knowledge instantly.",
  },
  whyMattersSection: {
    tag: "WHY IT MATTERS",
    heading: "Why a Modern Data Platform Matters for Your Business",
    intro: "When data infrastructure is reliable and cost-effective, your data scientists, analysts, and leadership can build new value instead of constantly debugging broken pipelines.",
    benefits: [
      {
        title: "Hit SLAs Reliably",
        desc: "Deliver fresh, accurate data to downstream dashboards and models before teams start their workday.",
      },
      {
        title: "Control Cloud Spend",
        desc: "Cut wasteful cloud computing and data warehouse costs through resource right-sizing and query tuning.",
      },
      {
        title: "Resilient Workflows",
        desc: "Automate scheduling and monitoring so pipelines fail loudly, recover quickly, and scale smoothly.",
      },
      {
        title: "Safe, Phased Migrations",
        desc: "Transition between orchestration tools or cloud warehouses without disruption or broken reports.",
      },
      {
        title: "Complete Data Lineage",
        desc: "Understand exactly who owns what data and trace dependencies to make platform changes with confidence.",
      },
      {
        title: "Trustworthy Data Quality",
        desc: "Catch bad data at ingestion with automated tests and contracts before it impacts customers or reports.",
      },
    ],
  },
  servicesSection: {
    tag: "OUR SERVICES",
    heading: "Complete Data Engineering & AI Platform Solutions",
    services: [
      {
        title: "ETL/ELT Performance & Cost Optimisation",
        desc: "We optimise your data pipelines and Spark jobs to reduce cloud costs, improve processing speed and meet business SLAs. Includes Spark tuning, SQL optimisation, resource right-sizing, and bottleneck profiling.",
      },
      {
        title: "Data Platform & Workflow Orchestration",
        desc: "We design and implement scalable data platforms and automated workflows using Apache Airflow, reusable operators, dependency management, CI/CD, proactive alerts, and self-service onboarding for new teams.",
      },
      {
        title: "Data Platform Modernisation & Migration",
        desc: "We plan and execute migrations across orchestration platforms, compute infrastructure, and cloud data warehouses with workload discovery, parallel runs, automated validation, phased cutover, and rollback plans.",
      },
      {
        title: "Data Governance, Cataloguing & Lineage",
        desc: "We provide complete visibility into data ownership, movement, and downstream dependencies using metadata catalogues, dataset tagging, lineage integration, and change-impact analysis so teams make changes safely.",
      },
      {
        title: "Automated Data Quality & Validation",
        desc: "We build automated checks for schema compliance, completeness, uniqueness, freshness, and consistency, implementing data contracts, source-to-target reconciliation, and early-warning quality alerts.",
      },
      {
        title: "Enterprise RAG Agents & Support Chatbots",
        desc: "We build AI assistants that retrieve answers from your internal documentation and knowledge bases, integrated into Slack, internal portals, and REST APIs to accelerate knowledge discovery and platform troubleshooting.",
      },
    ],
    aeo: {
      tag: "ORCHESTRATION & MIGRATION",
      heading: "Data Platform Modernisation & Workflow Orchestration",
      subheading: "Dependable, visible workflows that fail loudly, recover faster, and scale",
      description: "We help you transition from brittle, manual cron scripts to enterprise Apache Airflow orchestration and safely migrate compute or warehouse platforms with zero downtime.",
      services: [
        "Apache Airflow Architecture & Setup",
        "Custom Reusable Operators & Hooks",
        "CI/CD for Data Workflows & Pipelines",
        "Workload Discovery & Parallel Migration",
        "Automated Output Reconciliation",
        "Phased Cutover & Tested Rollback Plans",
      ],
    },
    geo: {
      tag: "QUALITY & AI AGENTS",
      heading: "Automated Data Quality, Lineage & Enterprise RAG",
      subheading: "Data contracts your business can trust, backed by intelligent AI assistants",
      description: "Stop bad data before it touches production dashboards, document ownership across datasets, and empower your engineers with internal RAG knowledge assistants.",
      services: [
        "Data Contracts & Schema Freshness Checks",
        "Source-to-Target Data Reconciliation",
        "Metadata Catalogues & Lineage Mapping",
        "Change-Impact & Dependency Analysis",
        "Enterprise RAG Document Assistants",
        "Slack, Portal & REST API Integrations",
      ],
    },
  },
  processSection: {
    tag: "HOW WE WORK",
    heading: "The Roadmap to a High-Performance Data Platform",
    steps: [
      {
        number: "01",
        title: "Assess",
        desc: "We review your current platform, pipelines, costs, SLAs and pain points, and agree on clear priorities.",
      },
      {
        number: "02",
        title: "Plan",
        desc: "We prepare a clear scope, architecture and phased roadmap, including risks and rollback options where relevant.",
      },
      {
        number: "03",
        title: "Build and Validate",
        desc: "We implement in phases with automated tests and validation at each step, running parallel systems during migrations.",
      },
      {
        number: "04",
        title: "Hand Over and Improve",
        desc: "We document what we built, train your team and support you after go-live as agreed in your proposal.",
      },
    ],
  },
  whyUsSection: {
    tag: "WHY CHOOSE US",
    heading: "Why Inquisitive Digital Stands Apart",
    items: [
      {
        title: "Engineering-First Approach",
        desc: "We start with measurement, profiling, and root causes — never guesswork.",
      },
      {
        title: "Safe, Controlled Migrations",
        desc: "Parallel runs, automated validation and rollback plans are core deliverables, not an afterthought.",
      },
      {
        title: "Built to Be Owned by Your Team",
        desc: "Reusable components, comprehensive documentation, and self-service onboarding for quick ramp-up.",
      },
      {
        title: "Quality Built In",
        desc: "Validation checks, data contracts, and proactive alerts are delivered with every pipeline.",
      },
      {
        title: "Clear, Transparent Communication",
        desc: "Defined scope, phased milestones, regular progress updates, and zero surprises.",
      },
      {
        title: "Sector-Specific Experience",
        desc: "Proven track record across finance, healthcare, e-commerce, EdTech, manufacturing, and tech.",
      },
    ],
  },
  resultsSection: {
    tag: "RESULTS YOU CAN EXPECT",
    heading: "Real Operational & Financial Impact",
    description: "Our Data Engineering Services are designed to deliver measurable business outcomes across performance, cloud infrastructure budgets, and engineering productivity:",
    outcomes: [
      {
        title: "Faster pipelines & guaranteed SLAs",
        desc: "Batch jobs complete well ahead of business deadlines, keeping executive reporting on schedule.",
      },
      {
        title: "Significant cloud cost reduction",
        desc: "Slash cloud bills by right-sizing cluster resources and eliminating wasteful unindexed queries.",
      },
      {
        title: "Zero-downtime platform migrations",
        desc: "Confidently upgrade compute engines and cloud data warehouses with full parallel verification.",
      },
      {
        title: "Total data lineage and ownership",
        desc: "Every dataset has clear owners, schemas, and upstream/downstream impact tracking.",
      },
      {
        title: "Early detection of data anomalies",
        desc: "Catch corrupt, stale, or schema-breaking data at the gate before it compromises reports or models.",
      },
      {
        title: "Reduced repeat developer interruptions",
        desc: "Enterprise RAG bots answer internal engineering and platform questions instantaneously.",
      },
    ],
  },
};

