import { module, test } from 'qunit';
import { setupTest } from 'employee/tests/helpers';

module('Unit | Controller | employee-list', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:employee-list');
    assert.ok(controller);
  });
});
