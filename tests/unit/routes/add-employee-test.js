import { module, test } from 'qunit';
import { setupTest } from 'employee/tests/helpers';

module('Unit | Route | add-employee', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-employee');
    assert.ok(route);
  });
});
