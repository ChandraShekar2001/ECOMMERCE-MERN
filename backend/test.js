const assert = require('assert');
const login = require('../frontend/src/Components/Auth/login_test');

describe('Login', function() {
  describe('#authenticate()', function() {
    it('should return true if the username and password are valid', function() {
      assert.equal(login.authenticate('venkatachandrashekar.pv@iiits.in', 'password'), true);
    });

    it('should return false if the username is invalid', function() {
      assert.equal(login.authenticate('invaliduser', 'password123'), false);
    });

    it('should return false if the password is invalid', function() {
      assert.equal(login.authenticate('venkatachandrashekar.pv@iiits.in', ''), false);
    });
  });
});