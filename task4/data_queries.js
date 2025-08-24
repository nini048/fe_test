

const axios = require("axios");

async function main() {
  try {
    const inputRes = await axios.get("https://share.shub.edu.vn/api/intern-test/input");
    const { token, data, query } = inputRes.data;
    console.log('>>>>>>token', token)
    console.log('>>>>>data', data)
    console.log('>>>>>query', query)

    const result = query.map(q => {
      const [l, r] = q.range;
      if (q.type === "1") {
        // Loại 1: tổng
        let sum = 0;
        for (let i = l; i <= r; i++) sum += data[i];
        return sum;
      } else if (q.type === "2") {
        // Loại 2: chẵn - lẻ
        let sum = 0;
        for (let i = l; i <= r; i++) {
          sum += (i % 2 === 0 ? 1 : -1) * data[i];
        }
        return sum;
      }
    });

    console.log('>>>>result', result)
    const outputRes = await axios.post(
      "https://share.shub.edu.vn/api/intern-test/output",
      result,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Output API response:", outputRes.data);
  }
  catch (e) {
    console.log(e)
  }
}

main();
