<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Web网页 Demo</title>
    <script src="<%=request.getContextPath()%>/js/ys_resource/ckplayer.js"></script>
</head>
<body>
    <div id="videoPlay" style="width: 1000px;height:500px;"></div>
    <script>
        var flashvars;
        flashvars={
            f: "<%=request.getContextPath()%>/js/ys_resource/m3u8.swf",
            a: 'http://vshare.ys7.com:80/openlive/427734888_1_2.m3u8?ticke=YkJoYmMxQitLWTRFMVBiTmN5ZWNMQ1dwMHo1emlRblRqMHFYZmt5dFhDbz0kMSQyMDE3MDMzMDEzNDUzOCQxNDU5MzE2MzI5MDAwJDE0OTA4NTIzMjkwMDAkMSQkJA==',    /*此处填写购买获取到的m3u8地址*/
            c: 0,
            p: 1,
            s: 4,
            lv: 1
        };
        var params = {bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent'};
        CKobject.embedSWF("<%=request.getContextPath()%>/js/ys_resource/ckplayer.swf", "videoPlay", "video", "100%", "100%", flashvars, params);
    </script>
</body>
</html>
</html>