import { useEffect, useState } from 'react';
import useServer from '../hooks/useServer.js';

function Upload() {
  return (
    <>
      <form>
        <div>
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' />
        </div>

        <div>
          <label htmlFor='description'>Description</label>
          <textarea id='description' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default Upload;
