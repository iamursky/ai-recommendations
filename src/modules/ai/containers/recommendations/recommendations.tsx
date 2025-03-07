"use client";

import { Button, Stepper } from "@mantine/core";
import { useCallback, useState, type FC } from "react";

import { CitySelect } from "@/modules/cities";
import { getCityLabel } from "@/modules/cities/lib/format-city-name";
import { getTopicLabel } from "@/modules/topics/lib/get-topic-label";
import { TopicSelect } from "@/modules/topics";
import type { TCity } from "@/modules/cities/types";
import type { TTopic } from "@/modules/topics/types";

import { RecommendationsChat } from "./recommendations-chat";

enum EStep {
  City = 0,
  Topic = 1,
  Recommendations = 2,
}

type TAiRecommendationsProps = {
  className?: string;
};

export const AiRecommendations: FC<TAiRecommendationsProps> = ({ className }) => {
  const [activeStep, setActiveStep] = useState<EStep>(EStep.City);
  const [maxStep, setMaxStep] = useState<EStep>(activeStep);

  const [city, setCity] = useState<TCity>();
  const [topic, setTopic] = useState<TTopic>();

  const handleChangeStep = useCallback((nextStep: number) => {
    setActiveStep(nextStep);
    setMaxStep((value) => Math.max(value, nextStep));
  }, []);

  const handleClickNext = useCallback(() => {
    handleChangeStep(activeStep + 1);
  }, [activeStep, handleChangeStep]);

  const getAllowStepSelect = useCallback(
    (step: EStep) => step !== activeStep && step <= maxStep,
    [activeStep, maxStep],
  );

  return (
    <Stepper active={activeStep} onStepClick={setActiveStep} className={className}>
      <Stepper.Step
        label="City"
        description={city ? getCityLabel(city) : "Select city"}
        allowStepSelect={getAllowStepSelect(EStep.City)}
      >
        <div className="flex flex-col gap-6 py-12">
          <CitySelect initialValue={city} onChange={setCity} />
          <Button fullWidth size="md" variant="filled" disabled={!city} onClick={handleClickNext}>
            Next
          </Button>
        </div>
      </Stepper.Step>

      <Stepper.Step
        label="Topic"
        description={topic ? getTopicLabel(topic) : "Choose topic"}
        allowStepSelect={getAllowStepSelect(EStep.Topic)}
      >
        <div className="flex flex-col gap-6 py-12">
          <TopicSelect initialValue={topic} onChange={setTopic} />
          <Button fullWidth size="md" variant="filled" disabled={!topic} onClick={handleClickNext}>
            Get Recommendations
          </Button>
        </div>
      </Stepper.Step>

      <Stepper.Step
        label="🎉 You're all set!"
        description="Get personalized recommendations"
        allowStepSelect={getAllowStepSelect(EStep.Recommendations)}
      >
        <div className="flex flex-col gap-6 py-12">
          {city && topic ? <RecommendationsChat city={getCityLabel(city)} topic={topic} /> : null}
        </div>
      </Stepper.Step>
    </Stepper>
  );
};
