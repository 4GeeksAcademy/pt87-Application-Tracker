export default function Addjob() {
  return (
    <div className="container mt-4">
      <h1>Add Job</h1>
      <p>Add job findings here.</p>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Company</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
        />
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Role</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
        />
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Location</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
        />
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Date</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
        />
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Status</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
        />
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Notes</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
        />
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Employment Type</label
        >
        <select class="form-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
          <option value="1">Full-time</option>
          <option value="2">Part-time</option>
          <option value="3">Contract</option>
          <option value="4">Internship</option>
        </select>
      </div>
    </div>

  );
}
