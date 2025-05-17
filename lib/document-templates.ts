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
    case "template-rencana-kerja":
      return {
        title: "Template Rencana Kerja",
        content: `
          <h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Nama Proyek</h1>
          <p style="margin-bottom: 16px;">Deskripsi proyek anda ...</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Target Proyek</h2>
          <ul style="margin-bottom: 16px; padding-left: 24px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Target 1</li>
            <li style="margin-bottom: 8px;">Target 2</li>
            <li style="margin-bottom: 8px;">Target 3</li>
          </ul>
                    
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Anggota Tim</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Nama</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Peran</th>
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
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Daftar Tugas</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Tugas</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Status</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Prioritas</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Penanggung Jawab</th>
                <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; height: 40px;">Tenggat Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
                <td style="border: 1px solid #d1d5db; padding: 8px 12px; height: 40px;"></td>
              </tr>
            </tbody>
          </table>
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
