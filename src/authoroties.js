module.exports = class authoroties {

 // #1
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

 _isLoggedIn(){
  return this.user != null
 }
  _isOwner() {
  return this.record.userId == this.user.id;
  }

  _isCollaborator() {
    return  this.user.shopperId == record.id;
  }

 _isShopper(){
   return this.user && this.record && (this._isOwner() || this._isCollaborator())
 }

}
