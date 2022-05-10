let fs = require('fs');
let path = require('path');
let clean = require('./render_image')
//let outputPrefix = "/data/output/code_result/book"
let outputPrefix = "/template"
function TableMarkdown(data) {
    let table = ""
    for (let i in data) {
        let item = data[i];
        let line = "|"
        for (let x of item) {
            line += " " + x + " |"
        }
        table += line + "\n"
    }
    table += "\n";
    return table;
}

function get_before_summary() {
    return fs.readFileSync("/data/output/clean/beforeSummary.template")
}
function get_after_summary() {
    return fs.readFileSync("/data/output/clean/afterSummary.template")
}
function get_result_summary() {
    return fs.readFileSync("/data/output/clean/result.template")
}

function get_result_down_up() {
    return fs.readFileSync("/data/output/diff/all_down_up.template")
}
function get_rmats_result() {
    return fs.readFileSync("/data/output/rmats_result/rmats.csv")
}
function get_line(filename,line_no) {
    line_no = parseInt(line_no);
    var data = fs.readFileSync(filename,'utf8');
    var lines = data.split("\n");
    for (var l in lines) {
        if (l == line_no - 1) {
            return lines[l].trim();
        }
    }
    return ""
}
function get_blast_report(name,line,all,data) {
    let regex = /\((.+?)\)/g;
    let arr =  data.match(regex);
    let result = [];
    result.push(name)
    result.push(line)
    result.push(all)
    let temps = [];
    for (let i = 0; i < arr.length;i++){
        let temp = arr[i].substring(arr[i].indexOf("(") + 1,arr[i].indexOf(")"));
        temps.push(temp);
    }
    result.push(temps[2])
    result.push(temps[1])
    return result
}
function render_table() {
    let content = fs.readFileSync("/data/build.json")
    let buildData = JSON.parse(content)
    console.log(buildData.project)
    // 渲染 project
    try {
        let file = outputPrefix + "/introduce/index1.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{project.number}}", buildData.project.number)
        data = data.replace("{{project.type}}", buildData.project.type)
        data = data.replace("{{project.species}}", buildData.project.species)
        data = data.replace("{{project.sampleForm}}", buildData.project.sampleForm)
        data = data.replace("{{project.platform}}", buildData.project.platform)
        data = data.replace("{{project.dataSize}}", buildData.project.dataSize)
        data = data.replace("{{project.analyse}}", buildData.project.analyse)
        data = data.replace("{{project.finished}}", buildData.project.finished)
        data = data.replace("{{project.manager}}", buildData.project.manager)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    try {
        let file = outputPrefix + "/introduce/index3.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{geneDetail.totalLen}}", buildData.geneDetail.totalLen)
        data = data.replace("{{geneDetail.totalSeqNum}}", buildData.geneDetail.totalSeqNum)
        data = data.replace("{{geneDetail.totalNCounts}}", buildData.geneDetail.totalNCounts)
        data = data.replace("{{geneDetail.totalLowCaseCounts}}", buildData.geneDetail.totalLowCaseCounts)
        data = data.replace("{{geneDetail.totalGCContent}}", buildData.geneDetail.totalGCContent)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    //这里需要加入渲染 quality部分的图片
    clean.copyCleanImageAndRender()
    //这里需要加入渲染 content部分的图片

    // try {
    //     let file = outputPrefix + "/base/README.md"
    //     let data = fs.readFileSync(file, 'utf8')
    //     let table = TableMarkdown(buildData.clean.desc)
    //     data = data.replace("{{table}}", table)
    //     fs.writeFileSync(file, data)
    // } catch (err) {
    //     console.error(err)
    // }


    // 渲染 clean desc
    // try {
    //     let file = outputPrefix + "/base/origin/README.md"
    //     let data = fs.readFileSync(file, 'utf8')
    //     let table = TableMarkdown(buildData.clean.desc)
    //     data = data.replace("{{table}}", table)
    //     fs.writeFileSync(file, data)
    // } catch (err) {
    //     console.error(err)
    // }


    // 渲染 clean data
    try {
        let file = outputPrefix + "/base/origin/data_origin.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_before_summary()
        console.log("before summery:",summary)
        //let table = TableMarkdown(summary)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/base/origin/filter_origin.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_result_summary()
        console.log("after summery:",summary)
        //let table = TableMarkdown(summary)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    let reportInput = []
    let samples = []
    let files = fs.readdirSync("/data/output/report_result");
    let num = 60234
    files.forEach(filename => {
        let filedir = path.join("/data/output/report_result", filename);
        if (filename.endsWith(".report")) {
            let name = filename.replace(".report", "");
            let input = fs.readFileSync(filedir, 'utf8');
            let line = get_line(filedir,2);
            line = line.replace("Total pairs:", "");
            line = line.replace(" ", "");
            let all = get_line(filedir,11);
            all = all.replace("Overall alignment rate:", "");
            all = all.replace(" ", "");
            let result = get_blast_report(name,line,all,input);
            reportInput.push(result);
            // sample 
            let temp = [name,"LRA" + num,"380bp","lllumina NovaSeq","Paired-end 2*150bp"]
            samples.push(temp)
            num++
        }
    })

    console.log("reportInput:",reportInput)
    console.log("samples:",samples)
    try {
        let file = outputPrefix + "/base/origin/library_origin.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(samples)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/base/origin/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(samples)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // 渲染 map.serial
    try {
        let file = outputPrefix + "/base/blast/result_blast.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(reportInput)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/base/blast/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(reportInput)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // 渲染 map distribution
    try {
        let file = outputPrefix + "/base/blast/area_blast.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(reportInput)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    //渲染diff
    // try {
    //     let file = outputPrefix + "/analyse/diff/README.md"
    //     let data = fs.readFileSync(file, 'utf8')
    //     data = data.replace("{{title1}}", buildData.diff.analyse.title)

    //     let table = TableMarkdown(buildData.diff.analyse.data);
    //     data = data.replace("{{table}}", table)
    //     data = data.replace("{{title2}}", buildData.diff.count.title)
    //     table = TableMarkdown(buildData.diff.count.data)
    //     data = data.replace("{{diff_table}}", table)
    //     fs.writeFileSync(file, data)
    // } catch (err) {
    //     console.error(err)
    // }
    try {
        let file = outputPrefix + "/analyse/diff/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_result_down_up()
        console.log("down up:",summary)
        //let table = TableMarkdown(summary)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    try {
        let file = outputPrefix + "/analyse/diff/check_diff.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_result_down_up()
        console.log("down up:",summary)
        //let table = TableMarkdown(summary)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // try {
    //     let file = outputPrefix + "/analyse/diff/check_diff.md"
    //     let data = fs.readFileSync(file, 'utf8')
    //     data = data.replace("{{title1}}", buildData.diff.analyse.title)
    //     let table = TableMarkdown(buildData.diff.analyse.data);
    //     data = data.replace("{{table}}", table)
    //     data = data.replace("{{title2}}", buildData.diff.count.title)
    //     table = TableMarkdown(buildData.diff.count.data)
    //     data = data.replace("{{diff_table}}", table)
    //     fs.writeFileSync(file, data)
    // } catch (err) {
    //     console.error(err)
    // }


    // 渲染site
    try {
        let file = outputPrefix + "/analyse/struct/README.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(buildData.analyse.site)
        data = data.replace("{{tables}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // 渲染site
    try {
        let file = outputPrefix + "/analyse/struct/site.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(buildData.analyse.site)
        data = data.replace("{{tables}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

     // 渲染site
    try {
        let file = outputPrefix + "/analyse/struct/rmats.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = get_rmats_result()
        data = data.replace("{{tables}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // build result dir
    clean.buildResult()
}

render_table()

// 挂载 output/ -> /data/