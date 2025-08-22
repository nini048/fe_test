
import React, { useState } from "react";
import './DataReport.scss'
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

const DataReport = () => {
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [file, setFile] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isValid, setIsValid] = useState({
    startTime: false,
    endTime: false,
    file: false
  });

  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsValid(prev => ({ ...prev, file: !!selectedFile }));

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(jsonData);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
    setIsValid(prev => ({ ...prev, startTime: e.target.value !== '' }));
  }

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
    setIsValid(prev => ({ ...prev, endTime: e.target.value !== '' }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.length || !startTime || !endTime) {
      alert('Please fill in all input fields');
      return;
    }

    const [startH, startM, startS] = startTime.split(":").map(Number);
    const [endH, endM, endS] = endTime.split(":").map(Number);

    const startSeconds = startH * 3600 + startM * 60 + startS;
    const endSeconds = endH * 3600 + endM * 60 + endS;
    if (startSeconds > endSeconds) {
      alert('Start time must be earlier than End time');
      return;
    }
    let t = 0;

    // Filter data by time and create preview
    const filteredPreview = data.slice(8).map((row) => {
      const time = row[2];
      const amount = row[8];
      if (!time || !amount) return null;
      const [h, m, s] = time.split(":").map(Number);
      const rowSeconds = h * 3600 + m * 60 + s;
      if (rowSeconds >= startSeconds && rowSeconds <= endSeconds) {
        t += Number(amount.toString().replace(/\./g, "") || 0);
        return {
          No: row[0],
          Date: row[1] || '',
          Time: row[2] || '',
          Quantity: row[6] || '',
          UnitPrice: row[7] || '',
          Amount: row[8] || '',
        };
      }
      return null;
    }).filter(Boolean);

    setPreviewData(filteredPreview);
    setTotal(t);
  };

  return (
    <div className="container mt-4">
      <div className="mb-4 title">DATA REPORT</div>
      <div className="row">
        <div className="col-md-6">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="timeStart" className="form-label">Start Time</label>
              <input type="time" id="timeStart" className="form-control"
                step={1}
                value={startTime}
                onChange={handleStartTime}
              />
            </div>

            <div className="col-12">
              <label htmlFor="timeEnd" className="form-label">End Time</label>
              <input type="time" id="timeEnd" className="form-control"
                step={1}
                value={endTime}
                onChange={handleEndTime}
              />
            </div>

            <div className="col-12">
              <label htmlFor="fileUpload" className="form-label">Upload Excel File</label>
              <input type="file" id="fileUpload" className="form-control" onChange={handleUploadFile} />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-dark w-100 mt-3">Submit</button>
            </div>

            {previewData.length > 0 && (
              <div className="total mt-2">
                Total Amount: {total.toLocaleString()} VND
              </div>
            )}
          </form>
        </div>

        <div className="col-md-6">
          <h5>Preview Table</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {(previewData.length > 0 ? previewData : data.slice(8)).map((row, index) => {
                  if (!row) return null;
                  const r = previewData.length > 0 ? row : {
                    No: row[0],
                    Date: row[1],
                    Time: row[2],
                    Quantity: row[6],
                    UnitPrice: row[7],
                    Amount: row[8],
                  };
                  return (
                    <tr key={index}>
                      <td>{r.No}</td>
                      <td>{r.Date}</td>
                      <td>{r.Time}</td>
                      <td>{r.Quantity}</td>
                      <td>{r.UnitPrice}</td>
                      <td>{r.Amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataReport;
