import { configAtom } from "@/Atoms";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import z from "zod";
import ModelSelector from "../filters/ModelSelector";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Textarea } from "./textarea";
import { useToast } from "./use-toast";

const validateNumberOrArray =
  (inputType: "float" | "int") => (value: string | number) => {
    const stringValue = typeof value === "string" ? value : value.toString();
    const values = stringValue.split(",");

    // If there is more than one value (comma-separated), validate each value
    if (values.length > 1) {
      return values.every((val) => {
        const parsedValue =
          inputType === "float"
            ? parseFloat(val.trim())
            : parseInt(val.trim(), 10);
        return !isNaN(parsedValue);
      });
    } else {
      // If there is only one value, validate it directly
      const parsedValue =
        inputType === "float"
          ? parseFloat(stringValue.trim())
          : parseInt(stringValue.trim(), 10);
      return !isNaN(parsedValue);
    }
  };

export const ParamsFormSchema = z.object({
  models: z.string().array().nonempty({
    message: "Select at least 1 model.",
  }),
  prompt: z.string().min(1),
  temperatureList: z.custom(
    (value) => validateNumberOrArray("float")(value as string | number),
    {
      message: `Invalid float array format. Please enter at least one valid float number.`,
    },
  ),
  repeatPenaltyList: z.custom(
    (value) => validateNumberOrArray("float")(value as string | number),
    {
      message: `Invalid float array format. Please enter at least one valid float number.`,
    },
  ),
  topKList: z.custom(
    (value) => validateNumberOrArray("int")(value as string | number),
    {
      message: `Invalid int array format. Please enter at least one valid integer number.`,
    },
  ),
  topPList: z.custom(
    (value) => validateNumberOrArray("float")(value as string | number),
    {
      message: `Invalid float array format. Please enter at least one valid float number.`,
    },
  ),
});

export default function FormGridParams() {
  const { toast } = useToast();
  const [config, _] = useAtom(configAtom);

  // Starts with value set in Settings > default options
  const form = useForm<z.infer<typeof ParamsFormSchema>>({
    resolver: zodResolver(ParamsFormSchema),
    defaultValues: {
      temperatureList: config.defaultOptions.temperature,
      repeatPenaltyList: config.defaultOptions.repeat_penalty,
      topKList: config.defaultOptions.top_k,
      topPList: config.defaultOptions.top_p,
      models: [],
      prompt: "",
    },
  });

  function onSubmit(data: z.infer<typeof ParamsFormSchema>) {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log("FORM ERRORS", form.formState.errors);
    }

    //TODO: Convert list values to arrays
    // before setting in global state
    console.log(data);

    toast({
      title: "Running experiment.",
      duration: 2500,
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <ModelSelector form={form} />
          </div>
          {/* prompt */}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Prompt</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormDescription>The prompt you want to test</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* temperature */}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="temperatureList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Temperature List</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    List of "temperature" values (e.g.: 0.5, 0.6, 0.7)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* repeatPenalty */}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="repeatPenaltyList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Repeat Penalty List
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    List of "repeat_penalty" values (e.g.: 1.0, 1.2, 1.5)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* top_k */}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="topKList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Top_K List</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    List of "top_k" values (e.g.: 5, 25, 50)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* top_p */}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="topPList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Top_P List</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    List of "top_p" values (e.g.: 0.5, 0.75, 0.9)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">Start Experiment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
