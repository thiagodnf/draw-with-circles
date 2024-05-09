import Spirograph from "./core/Spirograph.js";
import Canvas from "./utils/Canvas.js";
import DarkMode from "./utils/DarkMode.js";
import Settings from "./core/Settings.js";

let canvas = new Canvas("canvas");

let spirograph = new Spirograph(canvas);

function resizeWindow() {

    const $mainPanel = $(".main-panel");

    canvas.setWidth($mainPanel.width());
    canvas.setHeight($(window).height() - $mainPanel.offset().top - 32);

    $(".side-panel .card").height(canvas.getHeight() + 12);
}

function animate() {

    spirograph.update(canvas)

    requestAnimationFrame(animate);
}

function appendRow(radius, speed, clockwise, initialAngle = 0) {

    const selectedTrue = clockwise ? "selected" : "";
    const selectedFalse = clockwise ? "" : "selected";

    $("#input tbody").append(`
        <tr>
            <td><input type="number" class="form-control form-control-sm form-value" value="${radius}" step="1" min="5" max="200" required></input></td>
            <td><input type="number" class="form-control form-control-sm form-value" value="${speed}" step="1" min="1" max="100" required></input></td>
            <td>
                <select class="form-select form-select-sm form-value" required>
                    <option value="true" ${selectedTrue}>Yes</option>
                    <option value="false" ${selectedFalse}>No</option>
                </select>
            </td>
            <td><input type="number" class="form-control form-control-sm form-value" value="${initialAngle}" step="1" min="0" max="359" required></input></td>
            <td width="1px"><a class="btn btn-danger btn-sm btn-remove"><i class="bi bi-trash"></i></a></td>
        </tr>
    `);
}

$(function () {

    appendRow(50, 5, false, 0);
    appendRow(50, 10, true, 0);

    spirograph.addOrbit(50, 5, false, 0);
    spirograph.addOrbit(50, 10, true, 0);

    requestAnimationFrame(animate);

    DarkMode.init();

    $(window).resize(resizeWindow).trigger("resize");

    $("#showOrbits").change(function () {
        Settings.showOrbit = this.checked;
    }).trigger("change");

    $("#showCentroids").change(function () {
        Settings.showCentroid = this.checked;
    }).trigger("change");

    $("#showPlanet").change(function () {
        Settings.showPlanet = this.checked;
    }).trigger("change");

    $("#add-orbit").click(function (event) {
        appendRow(12, 12, false, 0);
    });

    $("#form-orbits").submit(function (event) {

        event.preventDefault();

        let rows = [];

        for (const r of $("#input tbody tr")) {

            const columns = [];

            for (const c of $(r).find("td .form-value")) {

                const value = $(c).val();

                const number = parseInt(value);

                if (Number.isNaN(number) && (value === "true" || value === "false")) {
                    columns.push(value === "true");
                } else {
                    columns.push(number);
                }
            }

            rows.push(columns);
        }

        spirograph.clear();

        for (const row of rows) {
            spirograph.addOrbit(row[0], row[1], row[2], row[3]);
        }
    });

    $(document).on("click", "#form-orbits .btn-remove", function () {
        $(this).parent().parent().remove();
    });
});



