import { module, test } from 'qunit';
import { setupTest } from 'employee/tests/helpers';

module('Unit | Service | employee-service', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:employee-service');
    assert.ok(service);
  });
});
