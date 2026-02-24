import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export default function Addjob() {

  const Addjob = () => {
    const naviagte = useNaviagte();
    const { dispatch } = useGlobalReducer();

    const [application, setApplication] = useState({
      companyname: '',
      role: '',
      location: '',
      details: '',
      date: '',
      status: '',
      salary: '',
      notes: '',
      employmenttype: '',
    });
  }
  return (
    <div className="container mt-4">
      <h1>Add Job</h1>
      <p>Add job findings here.</p>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label"
        >Company Name</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value=""
          required
          onChange={()=>{}}
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
        >Details</label
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
        >Salary</label
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
      <div className="hero-actions">
        <a href="#" class="btn-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>Add Job
        </a>
      </div>
    </div>
  );
}
