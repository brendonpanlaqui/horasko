function Profile() {
  return (
    <div>
      <h2 className="mb-4">Profile</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" defaultValue="John Doe" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" defaultValue="john@example.com" />
        </div>
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
}

export default Profile;
