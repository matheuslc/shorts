import UserSchema from '../schemas/userSchema';

/**
 * Class UserRepository
 */
export default class UserRepository {

 /**
  * @name getUserById
  * @param userId {String}
  * @return {Promise} Returns a promise with User Schema mongoose query result
  */
  getUserById(userId) {
    return UserSchema.findOne({id: userId});
  }

 /**
  * @name createUser
  * @return {Promise} Returns new UserSchema
  */
  createUser(userId) {
    return new UserSchema({
      id: userId
    });
  }

  /**
   * @create persist
   * @param User
   * @return {Promise} Persist user and returns a promise
   */
  persist(User) {
    return User.save();
  }

 /**
  * @create persist
  * @param userId {String}
  * @return {Promise} Persist user and returns a promise
  */
  deleteUser(userId) {
    return UserSchema.remove({id: userId});
  }

 /**
  * @name dataTransferObject
  * @param data
  * @return {Object} Format response to be exposed
  */
  dataTransferObject(data) {
    return {
      id: data.id
    };
  }
}
