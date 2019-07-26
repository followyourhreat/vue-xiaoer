// 配置select列表,将会生成对应的过滤器name + Filter

/* --------------账号管理 交易管理 ----------------- */
// 状态
export const userStatus = [
  { value: '0', label: '全部' },
  { value: '1', label: '正常' },
  { value: '2', label: '禁用' },
]
export const userStatusModal = [
    { value: '1', label: '正常' },
    { value: '2', label: '禁用' },
  ]
  // 等级
export const userLevel = [
  { value: '0', label: '全部' },
  { value: '1', label: '一级' },
  { value: '2', label: '二级' },
]
export const userLevelModal = [
  { value: '1', label: '一级' },
  { value: '2', label: '二级' },
]
export const userLevelModal2 = [

    { value: '2', label: '二级' },
  ]
export const dataSource = [
    { value: '0', label: '全部' },
    { value: '1', label: 'APP' },
    { value: '2', label: '公众号' },
  ]
export const tradeStatu = [
  { value: '0', label: '全部' },
  { value: '1', label: '待审核' },
  { value: '2', label: '审核成功' },
  { value: '3', label: '审核失败' },
  { value: '4', label: '提现成功' },
  { value: '5', label: '提现失败' },
]
export const packetType = [
  { value: '0', label: '全部' },
  { value: '1', label: '微信' },
  { value: '2', label: '支付宝' },
]
export const auditStatus = [
  { value: '', label: '全部' },
  { value: '1', label: '未审核' },
  { value: '0', label: '审核通过' },
  { value: '3', label: '审核失败' },
]
export const PreferentialStatus = [
  { value: '0', label: '全部' },
  { value: '1', label: '关闭' },
  { value: '2', label: '开启' },
]
export const BusinessStatus = [
  { value: '', label: '全部' },
  { value: '0', label: '营业' },
  { value: '1', label: '歇业' },
]
export const combinationStatus = [
  { value: '', label: '全部' },
  { value: '0', label: '利众生活技术部' },
  { value: '1', label: '利众生活客服部' },
  { value: '2', label: '利众生活市场部' },
]
export const roleStatus = [
  { value: '', label: '全部' },
  { value: '0', label: '客服' },
  { value: '1', label: '开发' },
  { value: '2', label: '地推' },
  { value: '3', label: '管理' },
  { value: '4', label: '董事长' },
]
  /* --------------财务管理 ----------------- */
  // 分润来源
export const financeSource = [
  { value: '0', label: '全部' },
  { value: '1', label: '推广费用' },
  { value: '2', label: '装机费用' },
  { value: '3', label: '售后服务费用' },
  { value: '4', label: '续费费用' },
  { value: '5', label: '达标奖励' },
  { value: '6', label: '好评返现' },
  { value: '7', label: '延期罚款' },
  { value: '8', label: '差评罚款' },
]
export const financeSourceModal = [
  { value: '1', label: '推广费用' },
  { value: '2', label: '装机费用' },
  { value: '3', label: '售后服务费用' },
  { value: '4', label: '续费费用' },
  { value: '5', label: '达标奖励' },
  { value: '6', label: '好评返现' },
  { value: '7', label: '延期罚款' },
  { value: '8', label: '差评罚款' },
]
export const bankModal = [
  { value: '1002', label: '工商银行' },
  { value: '1005', label: '农业银行' },
  { value: '1026', label: '中国银行' },
  { value: '1003', label: '建设银行' },
  { value: '1001', label: '招商银行' },
  { value: '1066', label: '邮储银行' },
  { value: '1020', label: '交通银行' },
  { value: '1004', label: '浦发银行' },
  { value: '1006', label: '民生银行' },
  { value: '1009', label: '兴业银行' },
  { value: '1010', label: '平安银行' },
  { value: '1021', label: '中信银行' },
  { value: '1025', label: '华夏银行' },
  { value: '1027', label: '广发银行' },
  { value: '1022', label: '光大银行' },
  { value: '1032', label: '北京银行' },
  { value: '1056', label: '宁波银行' },
]
