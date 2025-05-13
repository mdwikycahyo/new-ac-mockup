interface Template {
  title: string
  content: string
}

export function getTemplateContent(templateId: string): Template {
  switch (templateId) {
    case "draft-activity-timeline":
      return {
        title: "Draft Activity & Timeline",
        content: `
          <h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Draft Activity & Timeline</h1>
          <p style="margin-bottom: 16px;">This document outlines the activities and timeline for our upcoming project.</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Tujuan Kegiatan</h2>
          <p style="margin-bottom: 16px;">Describe the goals of the activity here...</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Deskripsi Singkat Aktivitas</h2>
          <p style="margin-bottom: 16px;">Provide a brief description of the activity...</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Rundown Acara</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Kegiatan</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
            </tbody>
          </table>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Lokasi</h2>
          <p style="margin-bottom: 16px;">Specify the location of the activity...</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Anggaran Sementara</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Kebutuhan</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Estimasi Biaya</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
            </tbody>
          </table>
        `,
      }
    case "project-plan":
      return {
        title: "Project Plan",
        content: `
          <h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Project Plan</h1>
          <p style="margin-bottom: 16px;">This document outlines the plan for our upcoming project.</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Project Overview</h2>
          <p style="margin-bottom: 16px;">Describe the project here...</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Goals and Objectives</h2>
          <ul style="margin-bottom: 16px; padding-left: 24px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Goal 1</li>
            <li style="margin-bottom: 8px;">Goal 2</li>
            <li style="margin-bottom: 8px;">Goal 3</li>
          </ul>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Timeline</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Task</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Date</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
            </tbody>
          </table>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Team Members</h2>
          <ul style="margin-bottom: 16px; padding-left: 24px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Team member 1 - Role</li>
            <li style="margin-bottom: 8px;">Team member 2 - Role</li>
          </ul>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Budget</h2>
          <p style="margin-bottom: 16px;">Budget details here...</p>
        `,
      }
    case "blank":
    default:
      return {
        title: "Untitled Document",
        content: "<p></p>",
      }
  }
}
