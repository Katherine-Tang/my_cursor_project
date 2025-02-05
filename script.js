// 用于存储所有用户提交的日期
let submissions = [];

function submitTime() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    // 验证日期
    if (!startDate || !endDate || startDate > endDate) {
        alert('请输入有效的日期范围！');
        return;
    }
    
    // 存储日期范围
    submissions.push({
        start: startDate,
        end: endDate
    });
    
    // 清空输入
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    
    alert('提交成功！');
    showResults();
}

function showResults() {
    if (submissions.length === 0) {
        document.getElementById('topDates').innerHTML = '暂无数据';
        return;
    }
    
    // 统计每个日期的空闲人数
    const dateCount = new Map();
    
    submissions.forEach(submission => {
        let currentDate = new Date(submission.start);
        while (currentDate <= submission.end) {
            const dateStr = currentDate.toISOString().split('T')[0];
            dateCount.set(dateStr, (dateCount.get(dateStr) || 0) + 1);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });
    
    // 将日期按空闲人数排序
    const sortedDates = Array.from(dateCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    
    // 显示结果
    const resultHtml = sortedDates.map((date, index) => {
        return `<p>第${index + 1}推荐日期: ${date[0]} (${date[1]}人空闲)</p>`;
    }).join('');
    
    document.getElementById('topDates').innerHTML = resultHtml;
} 