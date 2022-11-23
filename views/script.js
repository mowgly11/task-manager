$(document).ready(() => {
    $("#addTaskForm").on('submit', (e) => {
        e.preventDefault();

        const value = $("#task").val();

        $.ajax({
            url: "/dashboard",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                task: value
            }),
            success: (res) => {
                $("#message").html(`${res.message}`);
            }
        });
    });
});