export interface  ColumnPropertiesInterface {
  display: boolean;
  order: number;
  header?: string;
  propName?: string;
  sorting?: boolean;
  component?: any;
  pipes?: Array<any>;
}

export interface GridRequestInterface {
  page: number;
  limit: number;
  order?: {
    by: string | undefined;
    type: 'desc' | 'asc';
  };
}

export interface RequestType  {
  page: number;
  limit: number;
  order: {
    by: string,
    type: 'desc' | 'asc'
  };
  filters?: [];
  search?: string;
  dateFrom?: null;
  dateTo?: null;
}

export interface TableToolbar {
  totalDataCount?: boolean;
  search?: boolean;
  limit?: boolean;
}
