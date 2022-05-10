# 3.4.3 cSNP 和 InDel分析

<font face="微软雅黑" >&emsp;&emsp;cSNP 包括转换和颠换两种。SNP 在 CG 序列上出现的最为频繁，而且多是 C 转换为 T，原因是 CG 中的 C 常为甲基化的，自发地脱氨后即为胸腺嘧啶。SNP 出现的原因有很多，有的是遗传背景的单核苷酸多态性，有的是建库技术上造成的突变，有的则可能是测序中读取错误。InDel可能造成移码突变，导致 mRNA 翻译时遇上一个错误的终止密码子。一般 InDel 不是3的倍数的情况在编码区不常发生，在非编码区相对频繁地发生。除了在高度重复区域附近，InDel 发生的频率一般会低于 SNP。</font><br />

<font face="微软雅黑" >&emsp;&emsp;我们采用 Varscan 程序获取 SNP 和 InDel 位点，过滤标准为：</font><br />

- SNP 位点碱基 Q >20；
- 覆盖该位点的 Reads 数目> 8 ；
- 支持突变位点的 Reads 数目> 2；
- SNP 位点的 p-value < 0.01。

<font face="微软雅黑" >&emsp;&emsp;SNP 分析结果见表8，InDel 分析结果格式同 SNP 分析结果，SNP、InDel 和转换/颠换统计见图24。</font><br />

