import React, { useState } from 'react';

const ResumeUpload = ({ user, onSave }) => {
  const [fileName, setFileName] = useState(user?.resumeName || '');
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) return setError('File too large (max 5MB)');

    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...user, resume: reader.result, resumeName: f.name };
      onSave && onSave(updated);
    };
    reader.readAsDataURL(f);
    setFileName(f.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-3">Upload your resume</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} />
        {fileName && <div className="mt-3 text-sm text-slate-600">Uploaded: {fileName}</div>}
        <div className="mt-4">
          <button onClick={() => onSave && onSave(user)} className="bg-indigo-600 text-white px-4 py-2 rounded">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
