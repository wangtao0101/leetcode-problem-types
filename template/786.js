/*
 * @lc app=leetcode.cn id=786 lang=javascript
 *
 * [786] 第 K 个最小的素数分数
 *
 * https://leetcode-cn.com/problems/k-th-smallest-prime-fraction/description/
 *
 * algorithms
 * Hard (29.10%)
 * Total Accepted:    301
 * Total Submissions: 1K
 * Testcase Example:  '[1,2,3,5]\n3'
 *
 * 一个已排序好的表 A，其包含 1 和其他一些素数.  当列表中的每一个 p<q 时，我们可以构造一个分数 p/q 。
 * 
 * 那么第 k 个最小的分数是多少呢?  以整数数组的形式返回你的答案, 这里 answer[0] = p 且 answer[1] = q.
 * 
 * 
 * 示例:
 * 输入: A = [1, 2, 3, 5], K = 3
 * 输出: [2, 5]
 * 解释:
 * 已构造好的分数,排序后如下所示:
 * 1/5, 1/3, 2/5, 1/2, 3/5, 2/3.
 * 很明显第三个最小的分数是 2/5.
 * 
 * 输入: A = [1, 7], K = 1
 * 输出: [1, 7]
 * 
 * 
 * 注意:
 * 
 * 
 * A 的取值范围在 2 — 2000.
 * 每个 A[i] 的值在 1 —30000.
 * K 取值范围为 1 —A.length * (A.length - 1) / 2
 * 
 * 
 */
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function(A, K) {
    
};
