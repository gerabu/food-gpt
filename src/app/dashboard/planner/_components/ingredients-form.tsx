"use client";

import { XIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  type KeyboardEvent,
  useState,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GenerateButtonProps = ComponentProps<"button"> & {
  loading: boolean;
};

function GenerateButton({ loading, disabled, ...props }: GenerateButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? "Generating..." : "Generate"}
    </Button>
  );
}

type IngredientsFormProps = {
  onSubmit: (ingredients: string[]) => void;
  pending: boolean;
  error?: string[];
};

export default function IngredientsForm({
  pending,
  error,
  onSubmit,
}: IngredientsFormProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  function addIngredient() {
    if (inputValue.trim()) {
      setIngredients((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => {
      const temp = [...prev];
      temp.splice(index, 1);
      return temp;
    });
  }

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
  }

  function handleInputKeyDown(evt: KeyboardEvent<HTMLInputElement>) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      addIngredient();
    }
  }

  function handleOnClick() {
    onSubmit(ingredients);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="add-ingredient">What is in your fridge?</Label>
        <Input
          id="add-ingredient"
          value={inputValue}
          placeholder="Add an ingredient and press Enter"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <div className="flex gap-2">
        {ingredients.map((ingredient, index) => (
          <Badge key={index} className="flex gap-x-1">
            {ingredient}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeIngredient(index)}
            >
              <XIcon size={14} />
            </Button>
          </Badge>
        ))}
      </div>
      <GenerateButton loading={pending} onClick={handleOnClick} />
    </div>
  );
}
