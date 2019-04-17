import { TestBed } from '@angular/core/testing';

import { ImageProviderService } from './image-provider.service';

describe('ImageProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageProviderService = TestBed.get(ImageProviderService);
    expect(service).toBeTruthy();
  });
});
