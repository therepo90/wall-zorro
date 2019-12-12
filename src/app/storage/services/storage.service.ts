import { Injectable } from '@angular/core';

@Injectable()
export abstract class StorageService {
  constructor() {}

  abstract save(key: string, val: any);
  abstract get(key: string): Record<string, any> | string | null ;
}
