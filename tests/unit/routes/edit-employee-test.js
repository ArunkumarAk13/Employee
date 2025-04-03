import { module, test } from 'qunit';
import { setupTest } from 'employee/tests/helpers';

module('Unit | Route | edit-employee', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:edit-employee');
    assert.ok(route);
  });
});
