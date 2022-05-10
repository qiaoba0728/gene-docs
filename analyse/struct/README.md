# 3.4 结构分析

## 3.4.1 新转录位点分析
<font face="微软雅黑" >&emsp;&emsp;在已有的参考基因组基础上，使用软件StringTie ([http://ccb.jhu.edu/software/stringtie/](http://ccb.jhu.edu/software/stringtie/)) 将mapped reads进行组装拼接，与已知转录本进行比较，获得没有注释信息的转录本，将 Class Code 为"j", "i", "u"的转录本作为新转录本，"x" 可能为已知转录本的反义转录本，因此也作为新转录本，对所有新转录本进行功能注释。如果有做 LncRNA 分析，则被筛选为 LncRNA 的转录本将不作为新转录本进行注释，仅在 LncRNA 分析中分析。</font><br />

<center>表3 新转录本统计（部分）</center>

<style>
table th:first-of-type {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 40%;
}
table th:nth-of-type(3) {
    width: 40%;
}
</style>

| ch | ref_gene_id|   class_code|
| :--------: | :--------: | :--------: |
{{tables}}

**注**：
- Transcript_id：新转录本
- Reference_transcript_id：与新转录本在同一位点的已知转录本
- Class_code：新转录本与已知转录本的关系，详见附录


<center><img src='../asset/build_stat.png'></center>

<center>图18 转录本统计</center>


**注**：
- o：预测转录本的外显子与参考转录本重叠 
- i：预测的转录本完全属于一个参考内含子
- j：预测转录本是一种潜在的新型异构体，与参考转录本共享至少一个剪接区域
- u：预测转录本与已知参考转录本比较是基因间的区别
- x：预测转录本的外显子与参考链重叠，但位于不同链上

{{result}}