import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Dataset, DataColumn } from '../types';

export const parseCSV = (file: File): Promise<Dataset> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as Record<string, any>[];
          const columns = inferColumns(data);
          
          const dataset: Dataset = {
            id: Date.now().toString(),
            userId: '1', // Replace with actual user ID
            name: file.name.replace('.csv', ''),
            source: 'upload',
            columns,
            data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          resolve(dataset);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
};

export const parseExcel = (file: File): Promise<Dataset> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const columns = inferColumns(jsonData as Record<string, any>[]);
        
        const dataset: Dataset = {
          id: Date.now().toString(),
          userId: '1', // Replace with actual user ID
          name: file.name.replace(/\.(xlsx|xls)$/, ''),
          source: 'upload',
          columns,
          data: jsonData as Record<string, any>[],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        resolve(dataset);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

const inferColumns = (data: Record<string, any>[]): DataColumn[] => {
  if (!data.length) return [];
  
  const sample = data[0];
  return Object.keys(sample).map((key) => {
    const values = data.slice(0, 100).map((row) => row[key]).filter((v) => v != null);
    const type = inferDataType(values);
    
    return {
      name: key,
      type,
      nullable: values.length < data.slice(0, 100).length,
    };
  });
};

const inferDataType = (values: any[]): 'string' | 'number' | 'date' | 'boolean' => {
  if (!values.length) return 'string';
  
  // Check for numbers
  const numericValues = values.filter((v) => !isNaN(Number(v)) && v !== '');
  if (numericValues.length > values.length * 0.8) {
    return 'number';
  }
  
  // Check for dates
  const dateValues = values.filter((v) => !isNaN(Date.parse(v)));
  if (dateValues.length > values.length * 0.8) {
    return 'date';
  }
  
  // Check for booleans
  const booleanValues = values.filter((v) => 
    typeof v === 'boolean' || 
    ['true', 'false', '1', '0', 'yes', 'no'].includes(String(v).toLowerCase())
  );
  if (booleanValues.length > values.length * 0.8) {
    return 'boolean';
  }
  
  return 'string';
};

export const generateMockData = (): Dataset => {
  const data = Array.from({ length: 100 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 10000) + 1000,
    orders: Math.floor(Math.random() * 100) + 10,
    customers: Math.floor(Math.random() * 50) + 5,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
    revenue: Math.floor(Math.random() * 50000) + 5000,
    profit: Math.floor(Math.random() * 15000) + 1000,
  }));
  
  return {
    id: 'mock-sales-data',
    userId: '1',
    name: 'Sample Sales Data',
    source: 'upload',
    columns: [
      { name: 'date', type: 'date', nullable: false },
      { name: 'sales', type: 'number', nullable: false },
      { name: 'orders', type: 'number', nullable: false },
      { name: 'customers', type: 'number', nullable: false },
      { name: 'category', type: 'string', nullable: false },
      { name: 'revenue', type: 'number', nullable: false },
      { name: 'profit', type: 'number', nullable: false },
    ],
    data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Google Sheets integration utilities
export const parseGoogleSheetsData = (sheetData: any[][]): Dataset => {
  if (!sheetData.length) throw new Error('No data found in sheet');
  
  const headers = sheetData[0];
  const rows = sheetData.slice(1);
  
  const data = rows.map(row => {
    const obj: Record<string, any> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });
  
  const columns = inferColumns(data);
  
  return {
    id: Date.now().toString(),
    userId: '1',
    name: 'Google Sheets Data',
    source: 'google_sheets',
    columns,
    data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    syncSettings: {
      autoSync: true,
      syncInterval: 60, // 1 hour
      lastSync: new Date().toISOString(),
    },
  };
};