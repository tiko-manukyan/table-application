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
