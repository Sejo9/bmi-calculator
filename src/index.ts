import $ from "jquery";
import { Units } from "./Units";
import {
  calculateBMI,
  categorizeBMI,
  calculateIdealWeightRange,
} from "./BMICalculations";

$(() => {
  let unit: Units = Units.METRIC;

  //Units
  const $metric: JQuery<HTMLInputElement> = $("#metric");
  const $imperial: JQuery<HTMLInputElement> = $("#imperial");

  //Unit Displays
  const $metricDisplay: JQuery<HTMLDivElement> = $("#metric-display");
  const $imperialDisplay: JQuery<HTMLDivElement> = $("#imperial-display");

  //Input Fields
  const $calcInputs = $(
    $(".calc-input")
      .children()
      .filter((index, element) => element.tagName === "INPUT")
  );

  //Metric Fields
  const $cm: JQuery<HTMLInputElement> = $("#cm");
  const $kg: JQuery<HTMLInputElement> = $("#kg");

  //Imperial Fields
  const $ft: JQuery<HTMLInputElement> = $("#ft");
  const $in: JQuery<HTMLInputElement> = $("#in");
  const $st: JQuery<HTMLInputElement> = $("#st");
  const $lbs: JQuery<HTMLInputElement> = $("#lbs");

  //Welcome Box
  const $welcome: JQuery<HTMLDivElement> = $("#welcome");

  //Result Box
  const $result: JQuery<HTMLDivElement> = $("#result");
  const $score: JQuery<HTMLParagraphElement> = $("#score");
  const $resultText: JQuery<HTMLParagraphElement> = $("#result-text");

  //Add blue border when input fields are focused
  $calcInputs.on("focusin", (event) => {
    $(event.currentTarget).parent().addClass("calc-input-active");
  });

  $calcInputs.on("focusout", (event) => {
    $(event.currentTarget).parent().removeClass("calc-input-active");
  });

  //Display input fields based on unit selection
  $metric.on("click", () => {
    $imperialDisplay.hide();
    $metricDisplay.show();
    $result.hide();
    $welcome.show();
    unit = Units.METRIC;
  });

  $imperial.on("click", () => {
    clearFields();
    $metricDisplay.hide();
    $imperialDisplay.show();
    $result.hide();
    $welcome.show();
    unit = Units.IMPERIAL;
  });

  //Calculate BMI when metric input fields have both been filled
  $cm.on("change", (event) => {
    if ($kg.val()) {
      displayResults($kg.val() as number, $cm.val() as number);
    }
  });

  $kg.on("change", (event) => {
    if ($cm.val()) {
      displayResults($kg.val() as number, $cm.val() as number);
    }
  });

  //Calculate BMI when imperial inches(in) and pounds(lbs) input fields have both been filled
  $in.on("change", (event) => {
    if ($lbs.val()) {
      const height = Number($ft.val()) * 12 + Number($in.val());
      const weight = Number($st.val()) * 14 + Number($lbs.val());
      displayResults(weight, height);
    }
  });

  $lbs.on("change", (event) => {
    if ($in.val()) {
      const height: number = Number($ft.val()) * 12 + Number($in.val());
      const weight:number = Number($st.val()) * 14 + Number($lbs.val());
      displayResults(weight, height);
    }
  });
  //Clear input fields
  const clearFields = (): void => {
    $cm.val("");
    $kg.val("");
    $ft.val("");
    $in.val("");
    $st.val("");
    $lbs.val("");
  };

  const displayResults = (weight: number, height: number): void => {
    let bmiResult: number = calculateBMI(weight, height, unit);
    let bmiCategory: string = categorizeBMI(bmiResult);
    let idealWeight: string = calculateIdealWeightRange(height, unit);

    $score.html(bmiResult.toFixed(1));

    $resultText.html(
      `Your BMI suggests you’re ${bmiCategory}. Your ideal weight is between <strong>${idealWeight}</strong>`
    );

    $welcome.hide();

    $result.css("display", "flex");
  };
});
