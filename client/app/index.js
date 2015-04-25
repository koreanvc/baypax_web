function test2(callback) {
	$.ajax({
		type: "POST",
		url: "/test2",
		dataType: "JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		success: function(data) {
			// 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
			// TODO
			console.log(data);
			callback(data);
		},
		complete: function(data) {
			// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
			// TODO
		},
		error: function(xhr, status, error) {
			alert("에러발생");
		}
	});
}

function test() {
	test2(function(data) {
		$.ajax({
			type: "POST",
			url: "/test",
			dataType: "JSON",
			data: {
				"host":data[0].host,
				"username":data[0].username
			},
			success: function(data) {
				// 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
				// TODO
				console.log(data);
			},
			complete: function(data) {
				// 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
				// TODO
			},
			error: function(xhr, status, error) {
				alert("에러발생");
			}
		});
	})

}