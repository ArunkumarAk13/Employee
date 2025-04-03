import { module, test } from 'qunit';
import { setupTest } from 'employee/tests/helpers';

module('Unit | Route | employee-list', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:employee-list');
    assert.ok(route);
  });
});
