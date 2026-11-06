import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import * as catalog from '../../src/components/sites/figma-jitrapadu/project-data';

test('only visually verified projects receive extra gallery views, with the original cover first', () => {
  const { projects, projectImages } = catalog;
  assert.equal(typeof projectImages, 'function', 'Gallery image selection is not implemented');
  assert.equal(projects.length, 9);
  for (const project of projects) {
    const images = projectImages(project);
    assert.equal(images[0].src, project.image);
    assert.equal(new Set(images.map(image => image.src)).size, images.length);
    const expectedExtra = project.title === 'Kajang, Selangor' ? 'kajang-rds-7.webp'
      : project.title === 'Changkat Jong, Perak' ? 'changkat-jong-rds-9.webp' : null;
    assert.equal(images.length, expectedExtra ? 2 : 1, project.title);
    if (expectedExtra) {
      assert.ok(images[1].src.endsWith(expectedExtra));
      assert.ok(images[1].alt.includes(project.title));
      assert.ok(existsSync(`public${images[1].src}`));
    }
    assert.equal(images.some(image => image.src.includes('rds-8')), false, 'Unconfirmed installation must remain excluded');
  }
});
