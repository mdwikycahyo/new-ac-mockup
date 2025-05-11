"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-selector"

// Add the new document content for Quarterly Report Draft and Research Database
const documentData = {
  "1": {
    id: 1,
    title: "Assessment Overview",
    category: "Assessment",
    lastUpdated: "April 10, 2025",
    author: "Assessment Team",
    content: `
      <h1>Workplace Assessment Overview</h1>
      <p class="text-muted-foreground">Last updated: April 10, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Welcome to Your Assessment</h2>
      <p class="mt-2">This assessment is designed to evaluate your skills in a typical office environment. You will complete various tasks using email, documents, chat, and other workplace tools.</p>
      
      <h3 class="mt-4 text-xl font-bold">Assessment Format</h3>
      <p class="mt-2">The assessment simulates one workday at a typical company. You will be presented with various tasks and scenarios that you might encounter in a real workplace.</p>
      
      <h3 class="mt-4 text-xl font-bold">Key Objectives</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Demonstrate effective communication through email and chat</li>
        <li>Show ability to manage and prioritize tasks</li>
        <li>Display proficiency in document creation and editing</li>
        <li>Exhibit collaboration skills in virtual meetings</li>
        <li>Demonstrate time management and organization</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Assessment Components</h2>
      <p class="mt-2">The assessment includes the following components:</p>
      
      <h3 class="mt-4 text-xl font-bold">Email Tasks</h3>
      <p class="mt-2">You will receive and need to respond to various emails. Pay attention to tone, clarity, and completeness in your responses.</p>
      
      <h3 class="mt-4 text-xl font-bold">Document Management</h3>
      <p class="mt-2">You will need to create, edit, and review documents. Focus on organization, formatting, and attention to detail.</p>
      
      <h3 class="mt-4 text-xl font-bold">Virtual Meetings</h3>
      <p class="mt-2">You will participate in virtual meetings. Demonstrate professional communication and collaboration skills.</p>
      
      <h3 class="mt-4 text-xl font-bold">Task Management</h3>
      <p class="mt-2">You will be assigned multiple tasks with different priorities. Show your ability to organize and complete tasks efficiently.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Tips for Success</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Read all instructions carefully before beginning</li>
        <li>Manage your time effectively</li>
        <li>Pay attention to details in all communications</li>
        <li>Prioritize tasks based on urgency and importance</li>
        <li>Use the AI assistant if you need help understanding documents</li>
      </ul>
      
      <p class="mt-6">Good luck with your assessment!</p>
    `,
  },
  // Add new document for Quarterly Report Draft
  "101": {
    id: 101,
    title: "Quarterly Report Draft",
    category: "Finance",
    lastUpdated: "April 21, 2025",
    author: "Finance Team",
    content: `
      <h1>Q1 2025 Quarterly Report Draft</h1>
      <p class="text-muted-foreground">Last updated: April 21, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Executive Summary</h2>
      <p class="mt-2">The first quarter of 2025 showed strong performance across all business units, with revenue exceeding projections by 7.3% and operating costs remaining 2.1% under budget. Key growth areas included our enterprise solutions division and the newly launched consumer product line. This report provides a comprehensive overview of our financial performance, operational highlights, and strategic initiatives for Q1 2025.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Financial Highlights</h2>
      
      <h3 class="mt-4 text-xl font-bold">Revenue</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Total Revenue: $42.8M (7.3% above forecast)</li>
        <li>Product Revenue: $28.5M (5.6% above forecast)</li>
        <li>Service Revenue: $14.3M (10.8% above forecast)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Expenses</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Total Operating Expenses: $31.2M (2.1% under budget)</li>
        <li>Cost of Goods Sold: $18.7M (1.5% under budget)</li>
        <li>Sales & Marketing: $6.8M (on budget)</li>
        <li>Research & Development: $3.9M (4.8% under budget)</li>
        <li>General & Administrative: $1.8M (3.2% under budget)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Profitability</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Gross Margin: 56.3% (up from 54.8% in Q4 2024)</li>
        <li>Operating Margin: 27.1% (up from 25.3% in Q4 2024)</li>
        <li>Net Income: $8.9M (15.6% above forecast)</li>
        <li>Earnings Per Share: $0.78 (14.7% above forecast)</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Business Unit Performance</h2>
      
      <h3 class="mt-4 text-xl font-bold">Enterprise Solutions</h3>
      <p class="mt-2">The Enterprise Solutions division delivered exceptional results with revenue of $18.3M, representing 18.2% year-over-year growth. Key highlights include:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Secured 14 new enterprise clients, including 3 Fortune 500 companies</li>
        <li>Expanded existing client relationships, with upsell revenue of $3.2M</li>
        <li>Successfully launched Enterprise Platform v5.0 with enhanced security features</li>
        <li>Achieved 97% client retention rate</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Consumer Products</h3>
      <p class="mt-2">The Consumer Products division generated $15.6M in revenue, a 12.3% increase from the previous quarter. Notable achievements include:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Successful launch of NextGen product line, exceeding sales targets by 22%</li>
        <li>Expanded retail distribution to 850+ locations (up from 720 in Q4 2024)</li>
        <li>E-commerce sales grew by 28.5% quarter-over-quarter</li>
        <li>Customer satisfaction score improved to 4.7/5.0 (from 4.5/5.0)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Professional Services</h3>
      <p class="mt-2">The Professional Services division reported $8.9M in revenue, slightly below the forecast of $9.2M. Key points include:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Consulting services utilization rate of 82% (target: 85%)</li>
        <li>Implementation services revenue increased by 7.8% year-over-year</li>
        <li>Training services saw decreased demand, with revenue 12% below forecast</li>
        <li>Average project delivery time improved by 8.5%</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Strategic Initiatives Update</h2>
      
      <h3 class="mt-4 text-xl font-bold">Digital Transformation</h3>
      <p class="mt-2">Our internal digital transformation initiative is progressing according to schedule:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Phase 1 (Infrastructure Modernization) completed on time and 3% under budget</li>
        <li>Phase 2 (Process Automation) is 65% complete, with expected completion in Q2</li>
        <li>Initial automation implementations have reduced processing time by 42%</li>
        <li>Employee training on new systems is 78% complete</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">International Expansion</h3>
      <p class="mt-2">Progress on our Asia-Pacific expansion strategy:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Singapore office fully operational as of February 15</li>
        <li>Hiring for key positions in Tokyo office is 80% complete</li>
        <li>Regulatory approvals for Australian market entry secured</li>
        <li>Initial sales in Singapore and Malaysia exceeded expectations by 15%</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Sustainability Initiative</h3>
      <p class="mt-2">Our corporate sustainability program made significant progress:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Reduced carbon footprint by 12% compared to Q1 2024</li>
        <li>Sustainable packaging implemented for 75% of consumer products</li>
        <li>Energy efficiency improvements completed in 3 of 5 manufacturing facilities</li>
        <li>Published first comprehensive ESG report</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Q2 Outlook</h2>
      <p class="mt-2">Based on Q1 performance and current market conditions, we are adjusting our Q2 forecast:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Revenue forecast increased by 5% to $45.2M</li>
        <li>Operating margin target raised to 27.5% (from 26.8%)</li>
        <li>EPS guidance increased to $0.82 (from $0.76)</li>
      </ul>
      <p class="mt-2">Key focus areas for Q2 include:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Accelerating Professional Services growth through new service offerings</li>
        <li>Completing Phase 2 of the Digital Transformation initiative</li>
        <li>Launching operations in Australia and New Zealand</li>
        <li>Expanding the NextGen product line with two additional products</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Conclusion</h2>
      <p class="mt-2">Q1 2025 demonstrated strong execution across most of our business, with particularly impressive results in Enterprise Solutions and Consumer Products. While Professional Services fell slightly short of targets, the division has implemented a robust plan to address challenges and accelerate growth in Q2. Overall, the company is well-positioned to exceed our annual targets if current momentum continues.</p>
      
      <p class="mt-6 text-sm text-muted-foreground">Note: This is a draft report pending final review by the executive team and audit committee. Some figures may be subject to adjustment before the final release.</p>
    `,
  },
  // Add new document for Research Database
  "102": {
    id: 102,
    title: "Research Database",
    category: "Research",
    lastUpdated: "April 18, 2025",
    author: "Research Team",
    content: `
      <h1>Research Database Access Guide</h1>
      <p class="text-muted-foreground">Last updated: April 18, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Introduction</h2>
      <p class="mt-2">The company Research Database provides centralized access to industry reports, market analyses, competitive intelligence, and internal research to support strategic decision-making across all departments. This guide explains how to access and effectively use the database resources.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Database Overview</h2>
      <p class="mt-2">Our Research Database includes the following key components:</p>
      <ul class="mt-2 list-disc pl-6">
        <li><strong>Market Intelligence:</strong> Industry reports, market size data, growth forecasts, and trend analyses</li>
        <li><strong>Competitive Research:</strong> Competitor profiles, product comparisons, and strategic analyses</li>
        <li><strong>Customer Insights:</strong> Survey results, focus group findings, and demographic studies</li>
        <li><strong>Internal Research:</strong> Company-conducted studies, white papers, and proprietary data</li>
        <li><strong>Academic Resources:</strong> Access to scholarly journals, publications, and research papers</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Accessing the Database</h2>
      
      <h3 class="mt-4 text-xl font-bold">Web Portal</h3>
      <p class="mt-2">The primary method for accessing the Research Database is through our secure web portal:</p>
      <ol class="mt-2 list-decimal pl-6">
        <li>Navigate to <span class="font-mono text-blue-600">https://research.company.com</span></li>
        <li>Log in using your company credentials (same as your email login)</li>
        <li>For first-time users, complete the brief orientation tutorial</li>
        <li>Use the search function or browse by category to find relevant research</li>
      </ol>
      
      <h3 class="mt-4 text-xl font-bold">Mobile App</h3>
      <p class="mt-2">For access on the go, download our Research Database mobile app:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Available for iOS and Android devices</li>
        <li>Download from the company app portal or public app stores</li>
        <li>Log in using your company credentials</li>
        <li>Enables offline access to saved reports and documents</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">API Access</h3>
      <p class="mt-2">For teams needing to integrate research data into other systems:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>API documentation available at <span class="font-mono text-blue-600">https://research.company.com/api-docs</span></li>
        <li>Request API credentials through the IT Service Portal</li>
        <li>Supports JSON and XML response formats</li>
        <li>Rate limited to 1000 requests per hour per API key</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Search Capabilities</h2>
      
      <h3 class="mt-4 text-xl font-bold">Basic Search</h3>
      <p class="mt-2">The search bar at the top of the portal supports:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Keyword searches across all document content</li>
        <li>Title-specific searches using "title:" prefix</li>
        <li>Author searches using "author:" prefix</li>
        <li>Date range searches using "date:" followed by range (e.g., "date:2024-01-01 to 2025-04-01")</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Advanced Search</h3>
      <p class="mt-2">Click the "Advanced" link next to the search bar to access additional filters:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Document type (report, white paper, survey, etc.)</li>
        <li>Industry vertical</li>
        <li>Geographic region</li>
        <li>Publication source</li>
        <li>Internal vs. external research</li>
        <li>Confidentiality level</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Available Research Categories</h2>
      
      <h3 class="mt-4 text-xl font-bold">Industry Reports</h3>
      <p class="mt-2">Comprehensive analyses of industry trends, market sizes, and forecasts:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Quarterly industry outlook reports</li>
        <li>Annual state of the industry analyses</li>
        <li>Five-year market forecasts</li>
        <li>Emerging technology impact assessments</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Competitive Intelligence</h3>
      <p class="mt-2">Information about competitors and market positioning:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Competitor profiles and SWOT analyses</li>
        <li>Product feature comparisons</li>
        <li>Pricing strategy analyses</li>
        <li>Market share reports</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Consumer Research</h3>
      <p class="mt-2">Insights into customer behaviors, preferences, and trends:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Demographic studies</li>
        <li>Consumer behavior analyses</li>
        <li>Brand perception surveys</li>
        <li>Customer journey mapping</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Technology Trends</h3>
      <p class="mt-2">Research on emerging technologies and digital transformation:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Technology adoption forecasts</li>
        <li>Innovation trend analyses</li>
        <li>Digital transformation case studies</li>
        <li>Technical feasibility assessments</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Using Research Effectively</h2>
      
      <h3 class="mt-4 text-xl font-bold">Saving and Organizing</h3>
      <p class="mt-2">Manage your research efficiently:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Create custom collections to organize related research</li>
        <li>Save searches for regular monitoring</li>
        <li>Set up alerts for new research matching your criteria</li>
        <li>Add personal notes and highlights to documents</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Sharing and Collaboration</h3>
      <p class="mt-2">Collaborate with team members:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Share documents or collections with individuals or teams</li>
        <li>Control access levels (view, comment, edit)</li>
        <li>Add collaborative annotations to documents</li>
        <li>Export citations and bibliographies in multiple formats</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Requesting New Research</h2>
      <p class="mt-2">If you can't find the research you need:</p>
      <ol class="mt-2 list-decimal pl-6">
        <li>Click the "Request Research" button in the top navigation</li>
        <li>Complete the research request form with as much detail as possible</li>
        <li>Specify your timeline and business justification</li>
        <li>The Research Team will review your request within 2 business days</li>
      </ol>
      <p class="mt-2">Priority is given to requests that align with strategic business objectives and have executive sponsorship.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Training and Support</h2>
      
      <h3 class="mt-4 text-xl font-bold">Training Resources</h3>
      <p class="mt-2">Improve your research skills:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>On-demand video tutorials in the Learning Center</li>
        <li>Monthly live webinars (schedule available in the Events calendar)</li>
        <li>Departmental training sessions available upon request</li>
        <li>Research methodology guides and best practices</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Support Options</h3>
      <p class="mt-2">Get help when you need it:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Live chat support available 8am-6pm ET, Monday-Friday</li>
        <li>Email support at <span class="font-mono text-blue-600">research-support@company.com</span></li>
        <li>Schedule a consultation with a research specialist</li>
        <li>Submit technical issues through the IT Service Portal</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Usage Policies</h2>
      <p class="mt-2">Important guidelines for using the Research Database:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>All research materials are for internal business use only</li>
        <li>Do not share external research reports outside the company</li>
        <li>Respect confidentiality levels indicated on documents</li>
        <li>Properly cite sources when using research in presentations or reports</li>
        <li>Comply with all licensing agreements for third-party research</li>
      </ul>
      
      <p class="mt-6">For additional information or questions about the Research Database, contact the Research Team at <span class="font-mono text-blue-600">research-team@company.com</span>.</p>
    `,
  },
  "2": {
    id: 2,
    title: "Project Timeline",
    category: "Project Management",
    lastUpdated: "April 12, 2025",
    author: "Project Manager",
    content: `
      <h1>Project Timeline</h1>
      <p class="text-muted-foreground">Last updated: April 12, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Project Overview</h2>
      <p class="mt-2">This document outlines the timeline for the Q3 Marketing Campaign project. It includes key milestones, deliverables, and responsible team members.</p>
      
      <h3 class="mt-4 text-xl font-bold">Project Duration</h3>
      <p class="mt-2">Start Date: July 1, 2025</p>
      <p class="mt-2">End Date: September 30, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Key Milestones</h2>
      
      <h3 class="mt-4 text-xl font-bold">Phase 1: Planning (July 1-15)</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>July 1-5: Market research and competitor analysis</li>
        <li>July 6-10: Strategy development and campaign objectives</li>
        <li>July 11-15: Budget allocation and resource planning</li>
        <li>July 15: Planning phase review meeting</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Phase 2: Content Creation (July 16-August 15)</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>July 16-25: Creative concept development</li>
        <li>July 26-August 5: Content creation (copy, graphics, videos)</li>
        <li>August 6-12: Content review and revisions</li>
        <li>August 13-15: Final approval of all content</li>
        <li>August 15: Content review meeting</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Phase 3: Campaign Launch (August 16-31)</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>August 16-20: Platform setup and content scheduling</li>
        <li>August 21-25: Pre-launch testing</li>
        <li>August 26: Campaign launch</li>
        <li>August 27-31: Initial monitoring and adjustments</li>
        <li>August 31: Launch phase review meeting</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Phase 4: Monitoring and Optimization (September 1-30)</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>September 1-30: Ongoing campaign monitoring</li>
        <li>September 10: Mid-campaign performance review</li>
        <li>September 11-20: Campaign optimizations based on performance</li>
        <li>September 21-29: Data collection for final report</li>
        <li>September 30: Final campaign report and project closure</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Team Responsibilities</h2>
      
      <h3 class="mt-4 text-xl font-bold">Marketing Team</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Strategy development</li>
        <li>Content creation</li>
        <li>Campaign execution</li>
        <li>Performance monitoring</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Design Team</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Visual content creation</li>
        <li>Brand consistency</li>
        <li>Creative direction</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Analytics Team</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Performance tracking</li>
        <li>Data analysis</li>
        <li>Reporting</li>
      </ul>
    `,
  },
  "3": {
    id: 3,
    title: "Marketing Presentation",
    category: "Marketing",
    lastUpdated: "April 12, 2025",
    author: "Marketing Team",
    content: `
      <h1>Q3 Marketing Strategy Presentation</h1>
      <p class="text-muted-foreground">Last updated: April 12, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Executive Summary</h2>
      <p class="mt-2">This presentation outlines our marketing strategy for Q3 2025, focusing on increasing brand awareness, generating leads, and improving customer engagement across all channels.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Market Analysis</h2>
      
      <h3 class="mt-4 text-xl font-bold">Current Market Position</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>15% market share in our primary segment</li>
        <li>Growing competition from new market entrants</li>
        <li>Increasing customer demand for sustainable products</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Competitive Landscape</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Main competitor A has launched a new product line</li>
        <li>Competitor B is expanding into our territory</li>
        <li>Smaller competitors are gaining traction with niche audiences</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Target Audience</h2>
      
      <h3 class="mt-4 text-xl font-bold">Primary Segments</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Urban professionals (25-40 years)</li>
        <li>Small to medium businesses</li>
        <li>Eco-conscious consumers</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Customer Insights</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Increasing preference for mobile shopping</li>
        <li>Growing interest in product sustainability</li>
        <li>Higher engagement with video content</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Q3 Marketing Objectives</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Increase website traffic by 20%</li>
        <li>Generate 500 qualified leads</li>
        <li>Improve social media engagement by 25%</li>
        <li>Launch new product line with 1000+ pre-orders</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Marketing Channels</h2>
      
      <h3 class="mt-4 text-xl font-bold">Digital</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Social media campaigns (Instagram, LinkedIn, TikTok)</li>
        <li>Content marketing (blog, videos, podcasts)</li>
        <li>Email marketing campaigns</li>
        <li>Paid search and display advertising</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Traditional</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Industry trade shows</li>
        <li>Print advertising in select publications</li>
        <li>Local community sponsorships</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Campaign Timeline</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>July: Brand awareness campaign</li>
        <li>August: New product line pre-launch</li>
        <li>September: Product launch and promotional campaign</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Budget Allocation</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Digital marketing: 60%</li>
        <li>Content creation: 20%</li>
        <li>Traditional marketing: 10%</li>
        <li>Events and sponsorships: 10%</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Success Metrics</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Website traffic and conversion rates</li>
        <li>Lead generation and quality</li>
        <li>Social media engagement and growth</li>
        <li>Pre-order and sales numbers</li>
        <li>Customer feedback and sentiment</li>
      </ul>
    `,
  },
  "4": {
    id: 4,
    title: "Budget Analysis",
    category: "Finance",
    lastUpdated: "April 10, 2025",
    author: "Finance Department",
    content: `
      <h1>Q2 2025 Budget Analysis</h1>
      <p class="text-muted-foreground">Last updated: April 10, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Executive Summary</h2>
      <p class="mt-2">This document provides a comprehensive analysis of our Q2 2025 budget performance, highlighting key variances, trends, and recommendations for Q3 planning.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Budget Overview</h2>
      
      <h3 class="mt-4 text-xl font-bold">Q2 Budget Summary</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Total Budget: $1,250,000</li>
        <li>Actual Spend: $1,180,000</li>
        <li>Variance: $70,000 (5.6% under budget)</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Department Analysis</h2>
      
      <h3 class="mt-4 text-xl font-bold">Marketing Department</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Budget: $350,000</li>
        <li>Actual: $375,000</li>
        <li>Variance: $25,000 (7.1% over budget)</li>
        <li>Reason: Increased digital advertising costs and additional campaign for product launch</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Sales Department</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Budget: $400,000</li>
        <li>Actual: $385,000</li>
        <li>Variance: $15,000 (3.8% under budget)</li>
        <li>Reason: Reduced travel expenses due to more virtual meetings</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Operations Department</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Budget: $300,000</li>
        <li>Actual: $270,000</li>
        <li>Variance: $30,000 (10% under budget)</li>
        <li>Reason: Delayed facility upgrades and efficiency improvements</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">IT Department</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Budget: $200,000</li>
        <li>Actual: $150,000</li>
        <li>Variance: $50,000 (25% under budget)</li>
        <li>Reason: Postponed software implementation project to Q3</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Revenue Performance</h2>
      
      <h3 class="mt-4 text-xl font-bold">Q2 Revenue</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Target: $2,500,000</li>
        <li>Actual: $2,650,000</li>
        <li>Variance: $150,000 (6% above target)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Revenue by Product Line</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Product Line A: $1,200,000 (5% above forecast)</li>
        <li>Product Line B: $950,000 (8% above forecast)</li>
        <li>Product Line C: $500,000 (3% below forecast)</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Key Insights</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Overall positive budget performance with 5.6% savings</li>
        <li>Marketing overspend was offset by savings in other departments</li>
        <li>Revenue exceeded targets by 6%, indicating strong market performance</li>
        <li>Product Line C requires attention due to underperformance</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Recommendations for Q3</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Reallocate $20,000 from Operations to Marketing to support continued growth</li>
        <li>Proceed with IT implementation project in Q3 as planned</li>
        <li>Develop action plan to improve Product Line C performance</li>
        <li>Maintain virtual meeting approach for Sales to continue cost savings</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Conclusion</h2>
      <p class="mt-2">Q2 financial performance was strong overall, with revenue exceeding targets and expenses coming in under budget. The positive variances provide an opportunity to reinvest in strategic initiatives for Q3 while maintaining financial discipline.</p>
    `,
  },
  "5": {
    id: 5,
    title: "Meeting Notes",
    category: "Internal",
    lastUpdated: "April 8, 2025",
    author: "Executive Assistant",
    content: `
      <h1>Executive Team Meeting Notes</h1>
      <p class="text-muted-foreground">Date: April 8, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Attendees</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>Sarah Johnson, CEO</li>
        <li>Michael Chen, CFO</li>
        <li>Priya Patel, CTO</li>
        <li>David Rodriguez, CMO</li>
        <li>Emma Wilson, COO</li>
        <li>James Thompson, HR Director</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Agenda</h2>
      <ol class="mt-2 list-decimal pl-6">
        <li>Q2 Performance Review</li>
        <li>Q3 Strategic Planning</li>
        <li>New Product Launch Timeline</li>
        <li>Organizational Structure Updates</li>
        <li>AOB</li>
      </ol>
      
      <h2 class="mt-6 text-2xl font-bold">Discussion Points</h2>
      
      <h3 class="mt-4 text-xl font-bold">1. Q2 Performance Review</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Michael presented Q2 financial results: 6% above revenue targets, 5.6% under budget</li>
        <li>Sales team exceeded targets by 8% in North America, 4% in Europe</li>
        <li>Customer retention improved to 92% (up from 88% in Q1)</li>
        <li>Product Line C underperforming by 3% - David to develop action plan</li>
        <li><strong>Action:</strong> David to present Product Line C improvement strategy at next meeting</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">2. Q3 Strategic Planning</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Sarah outlined key priorities for Q3:
          <ul class="mt-1 list-circle pl-6">
            <li>Expansion into Asian markets</li>
            <li>Digital transformation acceleration</li>
            <li>Sustainability initiative launch</li>
          </ul>
        </li>
        <li>Budget allocations approved for all three initiatives</li>
        <li>Emma to lead cross-functional team for Asian market entry</li>
        <li>Priya to accelerate digital transformation roadmap</li>
        <li><strong>Action:</strong> All executives to submit detailed Q3 plans by April 15</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">3. New Product Launch Timeline</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Product X launch scheduled for August 15</li>
        <li>Marketing campaign to begin July 20</li>
        <li>Pre-orders to open August 1</li>
        <li>Production capacity confirmed for initial 10,000 units</li>
        <li>David and Emma reported all teams on track for launch</li>
        <li><strong>Action:</strong> Weekly status updates to begin from next Monday</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">4. Organizational Structure Updates</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>James presented proposal for new R&D department structure</li>
        <li>Creation of two new director positions approved</li>
        <li>Internal promotions to be prioritized where possible</li>
        <li>Restructuring to be completed by end of Q3</li>
        <li><strong>Action:</strong> James to circulate detailed implementation plan by April 20</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">5. AOB</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Annual company retreat confirmed for September 15-17</li>
        <li>Q2 all-hands meeting scheduled for April 22</li>
        <li>Office renovation project to begin in July</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Next Steps</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>All action items to be completed by assigned deadlines</li>
        <li>Next executive team meeting: April 22, 10:00 AM</li>
        <li>Sarah to meet individually with each executive before next team meeting</li>
      </ul>
      
      <p class="mt-6 italic">Minutes prepared by: Alex Foster, Executive Assistant</p>
    `,
  },
  "6": {
    id: 6,
    title: "Company Handbook",
    category: "HR Documents",
    lastUpdated: "January 15, 2025",
    author: "HR Department",
    content: `
      <h1>Company Handbook</h1>
      <p class="text-muted-foreground">Last updated: January 15, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Welcome to Our Company</h2>
      <p class="mt-2">This handbook contains important information about our company policies, procedures, and guidelines. It is designed to help you understand our company culture and expectations.</p>
      
      <h3 class="mt-4 text-xl font-bold">Our Mission</h3>
      <p class="mt-2">Our mission is to provide exceptional products and services while fostering a positive work environment for our employees. We strive to innovate, collaborate, and make a meaningful impact in our industry.</p>
      
      <h3 class="mt-4 text-xl font-bold">Core Values</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Integrity: We act with honesty and transparency in all our interactions.</li>
        <li>Excellence: We pursue the highest standards in our work.</li>
        <li>Collaboration: We believe in the power of teamwork and diverse perspectives.</li>
        <li>Innovation: We encourage creative thinking and continuous improvement.</li>
        <li>Respect: We treat everyone with dignity and value their contributions.</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Employment Policies</h2>
      <p class="mt-2">This section outlines our key employment policies and procedures.</p>
      
      <h3 class="mt-4 text-xl font-bold">Work Hours</h3>
      <p class="mt-2">Our standard work hours are from 9:00 AM to 5:00 PM, Monday through Friday. Flexible work arrangements may be available depending on your role and department needs.</p>
      
      <h3 class="mt-4 text-xl font-bold">Time Off</h3>
      <p class="mt-2">Full-time employees are eligible for paid time off, including vacation days, sick leave, and holidays. Please refer to the detailed Time Off Policy for specific information about accrual rates and requesting time off.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Code of Conduct</h2>
      <p class="mt-2">Our Code of Conduct establishes the expectations for behavior in the workplace. All employees are expected to adhere to these guidelines to maintain a positive and productive work environment.</p>
      
      <h3 class="mt-4 text-xl font-bold">Professional Behavior</h3>
      <p class="mt-2">Employees are expected to conduct themselves in a professional manner at all times. This includes treating colleagues with respect, communicating effectively, and representing the company positively both internally and externally.</p>
      
      <h3 class="mt-4 text-xl font-bold">Workplace Safety</h3>
      <p class="mt-2">Safety is a top priority. All employees must follow safety guidelines and report any hazards or incidents immediately to their supervisor or the Safety Officer.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Benefits</h2>
      <p class="mt-2">We offer a comprehensive benefits package to eligible employees, including health insurance, retirement plans, and professional development opportunities.</p>
      
      <h3 class="mt-4 text-xl font-bold">Health Insurance</h3>
      <p class="mt-2">Full-time employees are eligible for health, dental, and vision insurance. Coverage begins on the first day of the month following your start date.</p>
      
      <h3 class="mt-4 text-xl font-bold">Retirement Plan</h3>
      <p class="mt-2">We offer a 401(k) retirement plan with company matching contributions up to 4% of your salary.</p>
    `,
  },
  "7": {
    id: 7,
    title: "Brand Guidelines",
    category: "Marketing",
    lastUpdated: "February 15, 2025",
    author: "Marketing Department",
    content: `
      <h1>Brand Guidelines</h1>
      <p class="text-muted-foreground">Last updated: February 15, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Introduction</h2>
      <p class="mt-2">These brand guidelines establish the standards for our company's visual identity and messaging. Consistent application of these guidelines helps strengthen our brand recognition and ensures a cohesive experience across all touchpoints.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Logo</h2>
      
      <h3 class="mt-4 text-xl font-bold">Primary Logo</h3>
      <p class="mt-2">Our primary logo consists of the company wordmark and symbol. It should be used whenever possible on marketing materials, digital platforms, and corporate communications.</p>
      
      <h3 class="mt-4 text-xl font-bold">Logo Variations</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Full color (primary)</li>
        <li>One color (black)</li>
        <li>One color (white for dark backgrounds)</li>
        <li>Symbol only (for social media profiles and favicons)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Clear Space</h3>
      <p class="mt-2">Always maintain a minimum clear space around the logo equal to the height of the symbol. This ensures the logo remains visible and impactful.</p>
      
      <h3 class="mt-4 text-xl font-bold">Minimum Size</h3>
      <p class="mt-2">To maintain legibility, the logo should never be reproduced smaller than 1 inch (25mm) in width for print or 100 pixels for digital applications.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Color Palette</h2>
      
      <h3 class="mt-4 text-xl font-bold">Primary Colors</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Brand Blue: #0052CC (RGB: 0, 82, 204)</li>
        <li>Brand Green: #36B37E (RGB: 54, 179, 126)</li>
        <li>Brand Gray: #505F79 (RGB: 80, 95, 121)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Secondary Colors</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Accent Orange: #FF5630 (RGB: 255, 86, 48)</li>
        <li>Accent Purple: #6554C0 (RGB: 101, 84, 192)</li>
        <li>Accent Yellow: #FFAB00 (RGB: 255, 171, 0)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Neutral Colors</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Dark Gray: #172B4D (RGB: 23, 43, 77)</li>
        <li>Medium Gray: #7A869A (RGB: 122, 134, 154)</li>
        <li>Light Gray: #F4F5F7 (RGB: 244, 245, 247)</li>
        <li>White: #FFFFFF (RGB: 255, 255, 255)</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Typography</h2>
      
      <h3 class="mt-4 text-xl font-bold">Primary Typeface</h3>
      <p class="mt-2">Our primary typeface is Roboto. It should be used for all headings, subheadings, and body text across digital and print materials.</p>
      
      <h3 class="mt-4 text-xl font-bold">Font Weights</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Headings: Roboto Bold (700)</li>
        <li>Subheadings: Roboto Medium (500)</li>
        <li>Body Text: Roboto Regular (400)</li>
        <li>Captions: Roboto Light (300)</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Secondary Typeface</h3>
      <p class="mt-2">For situations where Roboto is unavailable, Arial may be used as a fallback font.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Imagery</h2>
      
      <h3 class="mt-4 text-xl font-bold">Photography Style</h3>
      <p class="mt-2">Our photography should be authentic, vibrant, and people-focused. Images should convey professionalism while remaining approachable and diverse.</p>
      
      <h3 class="mt-4 text-xl font-bold">Illustration Style</h3>
      <p class="mt-2">Illustrations should use our brand colors and maintain a clean, modern aesthetic with rounded corners and simple shapes.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Voice and Tone</h2>
      
      <h3 class="mt-4 text-xl font-bold">Brand Voice</h3>
      <p class="mt-2">Our brand voice is professional, knowledgeable, and approachable. We communicate with clarity and confidence while remaining conversational and human.</p>
      
      <h3 class="mt-4 text-xl font-bold">Tone Considerations</h3>
      <p class="mt-2">While our voice remains consistent, our tone may adjust based on the context:</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Marketing materials: Enthusiastic and inspiring</li>
        <li>Technical documentation: Clear and precise</li>
        <li>Customer support: Helpful and empathetic</li>
        <li>Internal communications: Collaborative and direct</li>
      </ul>
    `,
  },
  "8": {
    id: 8,
    title: "Project Proposal Template",
    category: "Templates",
    lastUpdated: "March 20, 2025",
    author: "Project Management Office",
    content: `
      <h1>Project Proposal Template</h1>
      <p class="text-muted-foreground">Last updated: March 20, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Project Overview</h2>
      <p class="mt-2">[Provide a brief summary of the project, including its purpose and main objectives. Keep this section concise but informative.]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Business Case</h2>
      
      <h3 class="mt-4 text-xl font-bold">Problem Statement</h3>
      <p class="mt-2">[Describe the business problem or opportunity that this project addresses. Be specific about the challenges or needs that exist.]</p>
      
      <h3 class="mt-4 text-xl font-bold">Proposed Solution</h3>
      <p class="mt-2">[Outline your proposed solution and how it addresses the problem. Explain why this approach is recommended.]</p>
      
      <h3 class="mt-4 text-xl font-bold">Strategic Alignment</h3>
      <p class="mt-2">[Explain how this project aligns with organizational goals and strategies. Reference specific strategic objectives where possible.]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Project Scope</h2>
      
      <h3 class="mt-4 text-xl font-bold">In Scope</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Item 1]</li>
        <li>[Item 2]</li>
        <li>[Item 3]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Out of Scope</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Item 1]</li>
        <li>[Item 2]</li>
        <li>[Item 3]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Deliverables</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Deliverable 1]</li>
        <li>[Deliverable 2]</li>
        <li>[Deliverable 3]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Project Timeline</h2>
      
      <h3 class="mt-4 text-xl font-bold">Key Milestones</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Milestone 1] - [Date]</li>
        <li>[Milestone 2] - [Date]</li>
        <li>[Milestone 3] - [Date]</li>
        <li>Project Completion - [Date]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Dependencies</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Dependency 1]</li>
        <li>[Dependency 2]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Resource Requirements</h2>
      
      <h3 class="mt-4 text-xl font-bold">Team</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Role 1] - [Time commitment]</li>
        <li>[Role 2] - [Time commitment]</li>
        <li>[Role 3] - [Time commitment]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Budget</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Personnel: $[Amount]</li>
        <li>Equipment: $[Amount]</li>
        <li>Software: $[Amount]</li>
        <li>Other: $[Amount]</li>
        <li>Total: $[Amount]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Risk Assessment</h2>
      
      <table class="mt-2 min-w-full border-collapse border">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Risk</th>
            <th class="border p-2 text-left">Impact</th>
            <th class="border p-2 text-left">Probability</th>
            <th class="border p-2 text-left">Mitigation Strategy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">[Risk 1]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[Strategy]</td>
          </tr>
          <tr>
            <td class="border p-2">[Risk 2]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[Strategy]</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Success Criteria</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>[Criterion 1]</li>
        <li>[Criterion 2]</li>
        <li>[Criterion 3]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Approval</h2>
      <p class="mt-2">By approving this project proposal, you authorize the project team to proceed with the project as described above.</p>
      
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p>Project Sponsor:</p>
          <p class="mt-2">Name: ____________________</p>
          <p class="mt-2">Signature: ________________</p>
          <p class="mt-2">Date: ____________________</p>
        </div>
        <div>
          <p>Project Manager:</p>
          <p class="mt-2">Name: ____________________</p>
          <p class="mt-2">Signature: ________________</p>
          <p class="mt-2">Date: ____________________</p>
        </div>
      </div>
    `,
  },
  "9": {
    id: 9,
    title: "Invoice Template",
    category: "Templates",
    lastUpdated: "March 15, 2025",
    author: "Finance Department",
    content: `
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-3xl font-bold">INVOICE</h1>
            <p class="text-muted-foreground mt-1">Invoice #: [Invoice Number]</p>
            <p class="text-muted-foreground">Date: [Invoice Date]</p>
            <p class="text-muted-foreground">Due Date: [Due Date]</p>
          </div>
          <div class="text-right">
            <h2 class="text-xl font-bold">[Your Company Name]</h2>
            <p>[Street Address]</p>
            <p>[City, State ZIP]</p>
            <p>[Phone Number]</p>
            <p>[Email Address]</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 class="font-bold mb-2">Bill To:</h3>
            <p>[Client Company Name]</p>
            <p>[Client Contact Name]</p>
            <p>[Street Address]</p>
            <p>[City, State ZIP]</p>
            <p>[Phone Number]</p>
            <p>[Email Address]</p>
          </div>
          <div>
            <h3 class="font-bold mb-2">Ship To:</h3>
            <p>[Shipping Company Name]</p>
            <p>[Shipping Contact Name]</p>
            <p>[Street Address]</p>
            <p>[City, State ZIP]</p>
            <p>[Phone Number]</p>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="font-bold mb-2">Payment Information:</h3>
          <p>Payment Terms: [Terms, e.g., Net 30]</p>
          <p>Payment Method: [Method, e.g., Bank Transfer]</p>
          <p>Account Number: [Account Number]</p>
          <p>Routing Number: [Routing Number]</p>
        </div>
        
        <table class="min-w-full border-collapse mb-8">
          <thead>
            <tr class="bg-muted">
              <th class="border p-2 text-left">Item</th>
              <th class="border p-2 text-left">Description</th>
              <th class="border p-2 text-right">Quantity</th>
              <th class="border p-2 text-right">Unit Price</th>
              <th class="border p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">[Item 1]</td>
              <td class="border p-2">[Description 1]</td>
              <td class="border p-2 text-right">[Quantity 1]</td>
              <td class="border p-2 text-right">$[Unit Price 1]</td>
              <td class="border p-2 text-right">$[Amount 1]</td>
            </tr>
            <tr>
              <td class="border p-2">[Item 2]</td>
              <td class="border p-2">[Description 2]</td>
              <td class="border p-2 text-right">[Quantity 2]</td>
              <td class="border p-2 text-right">$[Unit Price 2]</td>
              <td class="border p-2 text-right">$[Amount 2]</td>
            </tr>
            <tr>
              <td class="border p-2">[Item 3]</td>
              <td class="border p-2">[Description 3]</td>
              <td class="border p-2 text-right">[Quantity 3]</td>
              <td class="border p-2 text-right">$[Unit Price 3]</td>
              <td class="border p-2 text-right">$[Amount 3]</td>
            </tr>
          </tbody>
        </table>
        
        <div class="flex justify-end mb-8">
          <div class="w-64">
            <div class="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>$[Subtotal]</span>
            </div>
            <div class="flex justify-between py-2">
              <span>Tax ([Tax Rate]%):</span>
              <span>$[Tax Amount]</span>
            </div>
            <div class="flex justify-between py-2">
              <span>Shipping:</span>
              <span>$[Shipping Amount]</span>
            </div>
            <div class="flex justify-between py-2 font-bold border-t">
              <span>Total:</span>
              <span>$[Total Amount]</span>
            </div>
            <div class="flex justify-between py-2 text-muted-foreground">
              <span>Amount Paid:</span>
              <span>$[Amount Paid]</span>
            </div>
            <div class="flex justify-between py-2 font-bold">
              <span>Balance Due:</span>
              <span>$[Balance Due]</span>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="font-bold mb-2">Notes:</h3>
          <p>[Additional notes or payment instructions]</p>
        </div>
        
        <div class="text-center text-muted-foreground">
          <p>Thank you for your business!</p>
        </div>
      </div>
    `,
  },
  "10": {
    id: 10,
    title: "Monthly Report Template",
    category: "Templates",
    lastUpdated: "March 10, 2025",
    author: "Operations Team",
    content: `
      <h1>Monthly Report: [Month Year]</h1>
      <p class="text-muted-foreground">Prepared by: [Your Name]</p>
      <p class="text-muted-foreground">Department: [Department Name]</p>
      <p class="text-muted-foreground">Date: [Report Date]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Executive Summary</h2>
      <p class="mt-2">[Provide a brief overview of the month's performance, highlighting key achievements, challenges, and important metrics. This should be a concise summary that gives readers a quick understanding of the month's results.]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Performance Metrics</h2>
      
      <h3 class="mt-4 text-xl font-bold">Key Performance Indicators</h3>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">KPI</th>
            <th class="border p-2 text-right">Target</th>
            <th class="border p-2 text-right">Actual</th>
            <th class="border p-2 text-right">Variance</th>
            <th class="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">[KPI 1]</td>
            <td class="border p-2 text-right">[Target 1]</td>
            <td class="border p-2 text-right">[Actual 1]</td>
            <td class="border p-2 text-right">[Variance 1]</td>
            <td class="border p-2">[Status 1]</td>
          </tr>
          <tr>
            <td class="border p-2">[KPI 2]</td>
            <td class="border p-2 text-right">[Target 2]</td>
            <td class="border p-2 text-right">[Actual 2]</td>
            <td class="border p-2 text-right">[Variance 2]</td>
            <td class="border p-2">[Status 2]</td>
          </tr>
          <tr>
            <td class="border p-2">[KPI 3]</td>
            <td class="border p-2 text-right">[Target 3]</td>
            <td class="border p-2 text-right">[Actual 3]</td>
            <td class="border p-2 text-right">[Variance 3]</td>
            <td class="border p-2">[Status 3]</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="mt-4 text-xl font-bold">Financial Performance</h3>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Metric</th>
            <th class="border p-2 text-right">Budget</th>
            <th class="border p-2 text-right">Actual</th>
            <th class="border p-2 text-right">Variance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">Revenue</td>
            <td class="border p-2 text-right">$[Budget Revenue]</td>
            <td class="border p-2 text-right">$[Actual Revenue]</td>
            <td class="border p-2 text-right">$[Variance Revenue]</td>
          </tr>
          <tr>
            <td class="border p-2">Expenses</td>
            <td class="border p-2 text-right">$[Budget Expenses]</td>
            <td class="border p-2 text-right">$[Actual Expenses]</td>
            <td class="border p-2 text-right">$[Variance Expenses]</td>
          </tr>
          <tr>
            <td class="border p-2">Profit</td>
            <td class="border p-2 text-right">$[Budget Profit]</td>
            <td class="border p-2 text-right">$[Actual Profit]</td>
            <td class="border p-2 text-right">$[Variance Profit]</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Achievements</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>[Achievement 1]</li>
        <li>[Achievement 2]</li>
        <li>[Achievement 3]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Challenges</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>[Challenge 1]</li>
        <li>[Challenge 2]</li>
        <li>[Challenge 3]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Project Updates</h2>
      
      <h3 class="mt-4 text-xl font-bold">Project 1: [Project Name]</h3>
      <p class="mt-2"><strong>Status:</strong> [On Track/At Risk/Delayed]</p>
      <p class="mt-2"><strong>Progress:</strong> [Percentage Complete]</p>
      <p class="mt-2"><strong>Key Updates:</strong> [Brief description of progress made this month]</p>
      <p class="mt-2"><strong>Next Steps:</strong> [Upcoming milestones or deliverables]</p>
      
      <h3 class="mt-4 text-xl font-bold">Project 2: [Project Name]</h3>
      <p class="mt-2"><strong>Status:</strong> [On Track/At Risk/Delayed]</p>
      <p class="mt-2"><strong>Progress:</strong> [Percentage Complete]</p>
      <p class="mt-2"><strong>Key Updates:</strong> [Brief description of progress made this month]</p>
      <p class="mt-2"><strong>Next Steps:</strong> [Upcoming milestones or deliverables]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Team Updates</h2>
      <p class="mt-2"><strong>Staffing:</strong> [Current headcount, new hires, departures]</p>
      <p class="mt-2"><strong>Training:</strong> [Training initiatives completed or in progress]</p>
      <p class="mt-2"><strong>Recognition:</strong> [Team members who deserve special recognition]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Upcoming Priorities</h2>
      <ul class="mt-2 list-disc pl-6">
        <li>[Priority 1 for next month]</li>
        <li>[Priority 2 for next month]</li>
        <li>[Priority 3 for next month]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Conclusion</h2>
      <p class="mt-2">[Summary of the month's performance and outlook for the coming month. Include any recommendations or requests for support if needed.]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Appendices</h2>
      <p class="mt-2">[List any supporting documents, detailed reports, or additional information that is attached to this report.]</p>
    `,
  },
  "11": {
    id: 11,
    title: "Project Plan Template",
    category: "Templates",
    lastUpdated: "March 5, 2025",
    author: "Project Management Office",
    content: `
      <h1>Project Plan: [Project Name]</h1>
      <p class="text-muted-foreground">Version: [Version Number]</p>
      <p class="text-muted-foreground">Last Updated: [Date]</p>
      <p class="text-muted-foreground">Project Manager: [Name]</p>
      
      <h2 class="mt-6 text-2xl font-bold">Project Overview</h2>
      
      <h3 class="mt-4 text-xl font-bold">Project Description</h3>
      <p class="mt-2">[Provide a brief description of the project, including its purpose, goals, and expected outcomes.]</p>
      
      <h3 class="mt-4 text-xl font-bold">Project Objectives</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Objective 1]</li>
        <li>[Objective 2]</li>
        <li>[Objective 3]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Success Criteria</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Criterion 1]</li>
        <li>[Criterion 2]</li>
        <li>[Criterion 3]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Project Scope</h2>
      
      <h3 class="mt-4 text-xl font-bold">In Scope</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Item 1]</li>
        <li>[Item 2]</li>
        <li>[Item 3]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Out of Scope</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Item 1]</li>
        <li>[Item 2]</li>
        <li>[Item 3]</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Deliverables</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>[Deliverable 1]</li>
        <li>[Deliverable 2]</li>
        <li>[Deliverable 3]</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Project Organization</h2>
      
      <h3 class="mt-4 text-xl font-bold">Project Team</h3>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Role</th>
            <th class="border p-2 text-left">Name</th>
            <th class="border p-2 text-left">Department</th>
            <th class="border p-2 text-left">Responsibilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">Project Sponsor</td>
            <td class="border p-2">[Name]</td>
            <td class="border p-2">[Department]</td>
            <td class="border p-2">[Responsibilities]</td>
          </tr>
          <tr>
            <td class="border p-2">Project Manager</td>
            <td class="border p-2">[Name]</td>
            <td class="border p-2">[Department]</td>
            <td class="border p-2">[Responsibilities]</td>
          </tr>
          <tr>
            <td class="border p-2">Team Member</td>
            <td class="border p-2">[Name]</td>
            <td class="border p-2">[Department]</td>
            <td class="border p-2">[Responsibilities]</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="mt-4 text-xl font-bold">Stakeholders</h3>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Stakeholder</th>
            <th class="border p-2 text-left">Role/Department</th>
            <th class="border p-2 text-left">Interest/Influence</th>
            <th class="border p-2 text-left">Communication Needs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">[Name]</td>
            <td class="border p-2">[Role/Department]</td>
            <td class="border p-2">[Interest/Influence]</td>
            <td class="border p-2">[Communication Needs]</td>
          </tr>
          <tr>
            <td class="border p-2">[Name]</td>
            <td class="border p-2">[Role/Department]</td>
            <td class="border p-2">[Interest/Influence]</td>
            <td class="border p-2">[Communication Needs]</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Project Timeline</h2>
      
      <h3 class="mt-4 text-xl font-bold">Project Schedule</h3>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Phase/Task</th>
            <th class="border p-2 text-left">Start Date</th>
            <th class="border p-2 text-left">End Date</th>
            <th class="border p-2 text-left">Duration</th>
            <th class="border p-2 text-left">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">Phase 1: [Name]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Duration]</td>
            <td class="border p-2">[Owner]</td>
          </tr>
          <tr>
            <td class="border p-2">Task 1.1: [Name]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Duration]</td>
            <td class="border p-2">[Owner]</td>
          </tr>
          <tr>
            <td class="border p-2">Task 1.2: [Name]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Duration]</td>
            <td class="border p-2">[Owner]</td>
          </tr>
          <tr>
            <td class="border p-2">Phase 2: [Name]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Duration]</td>
            <td class="border p-2">[Owner]</td>
          </tr>
        </tbody>
      </table>
      
      <h3 class="mt-4 text-xl font-bold">Milestones</h3>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Milestone</th>
            <th class="border p-2 text-left">Date</th>
            <th class="border p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">[Milestone 1]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Description]</td>
          </tr>
          <tr>
            <td class="border p-2">[Milestone 2]</td>
            <td class="border p-2">[Date]</td>
            <td class="border p-2">[Description]</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Budget</h2>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Category</th>
            <th class="border p-2 text-right">Amount</th>
            <th class="border p-2 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">Personnel</td>
            <td class="border p-2 text-right">$[Amount]</td>
            <td class="border p-2">[Notes]</td>
          </tr>
          <tr>
            <td class="border p-2">Equipment</td>
            <td class="border p-2 text-right">$[Amount]</td>
            <td class="border p-2">[Notes]</td>
          </tr>
          <tr>
            <td class="border p-2">Software</td>
            <td class="border p-2 text-right">$[Amount]</td>
            <td class="border p-2">[Notes]</td>
          </tr>
          <tr>
            <td class="border p-2">Other</td>
            <td class="border p-2 text-right">$[Amount]</td>
            <td class="border p-2">[Notes]</td>
          </tr>
          <tr class="font-bold">
            <td class="border p-2">Total</td>
            <td class="border p-2 text-right">$[Total Amount]</td>
            <td class="border p-2"></td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Risk Management</h2>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Risk</th>
            <th class="border p-2 text-left">Impact</th>
            <th class="border p-2 text-left">Probability</th>
            <th class="border p-2 text-left">Mitigation Strategy</th>
            <th class="border p-2 text-left">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">[Risk 1]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[Strategy]</td>
            <td class="border p-2">[Owner]</td>
          </tr>
          <tr>
            <td class="border p-2">[Risk 2]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[High/Medium/Low]</td>
            <td class="border p-2">[Strategy]</td>
            <td class="border p-2">[Owner]</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Communication Plan</h2>
      <table class="mt-2 min-w-full border-collapse">
        <thead>
          <tr class="bg-muted">
            <th class="border p-2 text-left">Information</th>
            <th class="border p-2 text-left">Audience</th>
            <th class="border p-2 text-left">Method</th>
            <th class="border p-2 text-left">Frequency</th>
            <th class="border p-2 text-left">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border p-2">[Status Reports]</td>
            <td class="border p-2">[Stakeholders]</td>
            <td class="border p-2">[Email]</td>
            <td class="border p-2">[Weekly]</td>
            <td class="border p-2">[Project Manager]</td>
          </tr>
          <tr>
            <td class="border p-2">[Team Meetings]</td>
            <td class="border p-2">[Project Team]</td>
            <td class="border p-2">[In-person/Virtual]</td>
            <td class="border p-2">[Daily/Weekly]</td>
            <td class="border p-2">[Project Manager]</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="mt-6 text-2xl font-bold">Approval</h2>
      <p class="mt-2">By signing below, the project sponsor and project manager acknowledge that they have reviewed and approved this project plan.</p>
      
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p>Project Sponsor:</p>
          <p class="mt-2">Name: ____________________</p>
          <p class="mt-2">Signature: ________________</p>
          <p class="mt-2">Date: ____________________</p>
        </div>
        <div>
          <p>Project Manager:</p>
          <p class="mt-2">Name: ____________________</p>
          <p class="mt-2">Signature: ________________</p>
          <p class="mt-2">Date: ____________________</p>
        </div>
      </div>
    `,
  },
}

export default function DocumentViewPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const documentId = params.id as string
  const document = documentData[documentId] || documentData["1"] // Fallback to first document if not found
  const { t } = useLanguage()

  // Get the tab parameter from the URL
  const tab = searchParams.get("tab") || "assessment"

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/documents?tab=${tab}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{document.category}</Badge>
            <p className="text-sm text-muted-foreground">Last updated: {document.lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between"></div>

      <Card>
        <CardHeader className="border-b bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{document.title}</span>
            </div>
            <span className="text-sm text-muted-foreground">Author: {document.author}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: document.content }} />
        </CardContent>
      </Card>
    </div>
  )
}
