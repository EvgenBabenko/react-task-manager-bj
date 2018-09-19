export default str => encodeURIComponent(str)
  .replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
