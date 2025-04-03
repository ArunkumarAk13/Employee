import { module, test } from 'qunit';
import { setupTest } from 'employee/tests/helpers';

module('Unit | Controller | edit-employee', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:edit-employee');
    assert.ok(controller);
  });
});
