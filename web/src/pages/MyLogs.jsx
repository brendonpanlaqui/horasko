function MyLogs() {
  return (
    <div>
      <h2 className="mb-4">My Logs</h2>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Work Hours Logs</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Hours Worked</th>
                  <th>Notes</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-09-01</td>
                  <td>8</td>
                  <td>Project A</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2025-09-02</td>
                  <td>7</td>
                  <td>Project B</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2025-09-03</td>
                  <td>6</td>
                  <td>Documentation</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="btn btn-success mt-3">
            <i className="bi bi-plus-lg me-2"></i> Add Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyLogs;
