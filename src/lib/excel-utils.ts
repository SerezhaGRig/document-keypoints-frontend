import * as XLSX from 'xlsx'
import { Keypoint, DocumentAnalysis } from '@/types'

export interface ExcelExportOptions {
  includeTimestamps?: boolean
  includeKeypontDescriptions?: boolean
  includeSummary?: boolean
  dateFormat?: string
}

export class ExcelExporter {
  private workbook: XLSX.WorkBook
  private keypoints: Keypoint[]
  private documents: DocumentAnalysis[]
  private options: ExcelExportOptions

  constructor(
    keypoints: Keypoint[],
    documents: DocumentAnalysis[],
    options: ExcelExportOptions = {}
  ) {
    this.keypoints = keypoints
    this.documents = documents
    this.options = {
      includeTimestamps: true,
      includeKeypontDescriptions: true,
      includeSummary: true,
      dateFormat: 'yyyy-mm-dd hh:mm:ss',
      ...options
    }
    this.workbook = XLSX.utils.book_new()
  }

  // Apply styling to header cells
  private styleHeaders(ws: XLSX.WorkSheet, range: string) {
    if (!ws['!cols']) ws['!cols'] = []
    
    // Style header row with background color
    const headerRange = XLSX.utils.decode_range(range)
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
      if (!ws[cellAddress]) continue
      
      ws[cellAddress].s = {
        fill: { fgColor: { rgb: 'E5E7EB' } },
        font: { bold: true, color: { rgb: '374151' } },
        alignment: { horizontal: 'center', vertical: 'center' }
      }
    }
  }

  // Create comparison sheet
  private createComparisonSheet(): XLSX.WorkSheet {
    const data = []
    
    // Headers
    const headers = ['Keypoint']
    if (this.options.includeKeypontDescriptions) {
      headers.push('Description')
    }
    headers.push(...this.documents.map(d => d.name))
    data.push(headers)
    
    // Data rows
    this.keypoints.forEach(kp => {
      const row = [kp.name]
      if (this.options.includeKeypontDescriptions) {
        row.push(kp.description)
      }
      this.documents.forEach(doc => {
        row.push(doc.results[kp.name] || 'N/A')
      })
      data.push(row)
    })

    const ws = XLSX.utils.aoa_to_sheet(data)
    
    // Set column widths
    const colWidths = [{ wch: 20 }]
    if (this.options.includeKeypontDescriptions) {
      colWidths.push({ wch: 40 })
    }
    colWidths.push(...this.documents.map(() => ({ wch: 30 })))
    ws['!cols'] = colWidths

    return ws
  }

  // Create detailed analysis sheet
  private createDetailedSheet(): XLSX.WorkSheet {
    const data = [['Document Analysis Details']]
    data.push([]) // Empty row
    
    // Headers
    const headers = ['Document Name', 'Keypoint', 'Result']
    if (this.options.includeTimestamps) {
      headers.push('Analysis Date')
    }
    data.push(headers)
    
    // Data rows
    this.documents.forEach(doc => {
      this.keypoints.forEach(kp => {
        const row = [
          doc.name,
          kp.name,
          doc.results[kp.name] || 'N/A'
        ]
        if (this.options.includeTimestamps) {
          row.push(new Date(doc.timestamp).toLocaleString())
        }
        data.push(row)
      })
      data.push([]) // Empty row between documents
    })

    const ws = XLSX.utils.aoa_to_sheet(data)
    
    // Merge title cell
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }]
    
    // Set column widths
    ws['!cols'] = [
      { wch: 25 },
      { wch: 20 },
      { wch: 40 },
      ...(this.options.includeTimestamps ? [{ wch: 20 }] : [])
    ]

    return ws
  }

  // Create summary statistics sheet
  private createSummarySheet(): XLSX.WorkSheet {
    const data = [
      ['Document Analysis Summary'],
      [],
      ['Statistics'],
      ['Total Documents', this.documents.length],
      ['Total Keypoints', this.keypoints.length],
      ['Export Date', new Date().toLocaleString()],
      [],
      ['Documents Analyzed:']
    ]
    
    this.documents.forEach((doc, idx) => {
      data.push([
        `${idx + 1}. ${doc.name}`,
        new Date(doc.timestamp).toLocaleDateString()
      ])
    })
    
    data.push([])
    data.push(['Keypoints Used:'])
    
    this.keypoints.forEach((kp, idx) => {
      data.push([
        `${idx + 1}. ${kp.name}`,
        kp.description
      ])
    })

    const ws = XLSX.utils.aoa_to_sheet(data)
    
    // Merge title cells
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }
    ]
    
    // Set column widths
    ws['!cols'] = [{ wch: 30 }, { wch: 50 }]

    return ws
  }

  // Create pivot table data
  private createPivotSheet(): XLSX.WorkSheet {
    const data = [['Pivot Table Data']]
    data.push([])
    data.push(['Document', 'Keypoint', 'Result Value'])
    
    this.documents.forEach(doc => {
      this.keypoints.forEach(kp => {
        data.push([
          doc.name,
          kp.name,
          doc.results[kp.name] || 'N/A'
        ])
      })
    })

    const ws = XLSX.utils.aoa_to_sheet(data)
    ws['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 40 }]
    
    return ws
  }

  // Generate and download the Excel file
  public export(filename?: string) {
    // Add comparison sheet
    const comparisonSheet = this.createComparisonSheet()
    XLSX.utils.book_append_sheet(this.workbook, comparisonSheet, 'Comparison')
    
    // Add detailed analysis sheet
    const detailSheet = this.createDetailedSheet()
    XLSX.utils.book_append_sheet(this.workbook, detailSheet, 'Detailed Analysis')
    
    // Add summary sheet if enabled
    if (this.options.includeSummary) {
      const summarySheet = this.createSummarySheet()
      XLSX.utils.book_append_sheet(this.workbook, summarySheet, 'Summary')
    }
    
    // Add pivot table data
    const pivotSheet = this.createPivotSheet()
    XLSX.utils.book_append_sheet(this.workbook, pivotSheet, 'Pivot Data')
    
    // Generate filename
    const exportFilename = filename || 
      `document_analysis_${new Date().toISOString().split('T')[0]}.xlsx`
    
    // Write file
    XLSX.writeFile(this.workbook, exportFilename)
  }

  // Get workbook as buffer (for server-side generation)
  public getBuffer(): Buffer {
    return XLSX.write(this.workbook, { type: 'buffer', bookType: 'xlsx' })
  }

  // Get workbook as base64 (for API responses)
  public getBase64(): string {
    return XLSX.write(this.workbook, { type: 'base64', bookType: 'xlsx' })
  }
}

// Helper function for quick export
export function exportToExcel(
  keypoints: Keypoint[],
  documents: DocumentAnalysis[],
  filename?: string,
  options?: ExcelExportOptions
) {
  const exporter = new ExcelExporter(keypoints, documents, options)
  exporter.export(filename)
}