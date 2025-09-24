'use client'

import { useKeypoints } from '@/context/KeypointsContext'
import * as XLSX from 'xlsx'

export default function ExportButton() {
  const { documents, keypoints } = useKeypoints()

  const exportToExcel = () => {
    if (documents.length === 0) {
      alert('No data to export')
      return
    }

    // Create a new workbook
    const wb = XLSX.utils.book_new()

    // Sheet 1: Comparison Table
    const comparisonData = []
    
    // Add headers
    const headers = ['Keypoint', ...documents.map(d => d.name)]
    comparisonData.push(headers)
    
    // Add data rows
    keypoints.forEach(kp => {
      const row = [kp.name]
      documents.forEach(doc => {
        row.push(doc.results[kp.name] || 'N/A')
      })
      comparisonData.push(row)
    })

    // Create worksheet
    const ws1 = XLSX.utils.aoa_to_sheet(comparisonData)
    
    // Set column widths
    const colWidths = [
      { wch: 20 }, // Keypoint column
      ...documents.map(() => ({ wch: 30 })) // Document columns
    ]
    ws1['!cols'] = colWidths

    // Add the comparison sheet
    XLSX.utils.book_append_sheet(wb, ws1, 'Comparison')

    // Sheet 2: Keypoints Details
    const keypointsData = [
      ['Name', 'Description'],
      ...keypoints.map(kp => [kp.name, kp.description])
    ]
    const ws2 = XLSX.utils.aoa_to_sheet(keypointsData)
    ws2['!cols'] = [{ wch: 20 }, { wch: 50 }]
    XLSX.utils.book_append_sheet(wb, ws2, 'Keypoints')

    // Sheet 3: Document Details
    const documentData = [
      ['Document Name', 'Analysis Date', 'Keypoint', 'Result']
    ]
    
    documents.forEach(doc => {
      keypoints.forEach(kp => {
        documentData.push([
          doc.name,
          new Date(doc.timestamp).toLocaleString(),
          kp.name,
          doc.results[kp.name] || 'N/A'
        ])
      })
    })
    
    const ws3 = XLSX.utils.aoa_to_sheet(documentData)
    ws3['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 40 }]
    XLSX.utils.book_append_sheet(wb, ws3, 'Details')

    // Sheet 4: Summary Statistics
    const summaryData = [
      ['Summary Statistics'],
      [''],
      ['Total Documents Analyzed', documents.length],
      ['Total Keypoints', keypoints.length],
      ['Export Date', new Date().toLocaleString()],
      [''],
      ['Document List:'],
      ...documents.map((doc, idx) => [`${idx + 1}. ${doc.name}`, new Date(doc.timestamp).toLocaleDateString()])
    ]
    
    const ws4 = XLSX.utils.aoa_to_sheet(summaryData)
    ws4['!cols'] = [{ wch: 30 }, { wch: 25 }]
    XLSX.utils.book_append_sheet(wb, ws4, 'Summary')

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `document_analysis_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const exportToCSV = () => {
    if (documents.length === 0) {
      alert('No data to export')
      return
    }

    // Create CSV header
    const headers = ['Keypoint', ...documents.map(d => d.name)]
    
    // Create CSV rows
    const rows = keypoints.map(kp => {
      const row = [kp.name]
      documents.forEach(doc => {
        row.push(doc.results[kp.name] || 'N/A')
      })
      return row
    })

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `analysis_results_${Date.now()}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    if (documents.length === 0) {
      alert('No data to export')
      return
    }

    const exportData = {
      keypoints,
      documents,
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `analysis_results_${Date.now()}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={exportToExcel}
        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Excel
      </button>
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        Export CSV
      </button>
      <button
        onClick={exportToJSON}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Export JSON
      </button>
    </div>
  )
}