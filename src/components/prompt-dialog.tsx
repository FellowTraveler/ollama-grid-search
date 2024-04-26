import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import z from "zod";

interface IProps {
  originalForm: any;
  content: string;
  fieldName: string;
  fieldLabel: string;
}

export function PromptDialog(props: IProps) {
  const { originalForm, content, fieldName, fieldLabel } = props;
  const [open, setOpen] = useState(false);

  // * default_options has to be valid JSON
  const FormSchema = z.object({
    [fieldName]: z.string(),
  });

  // * format default_options to display in form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [fieldName]: content,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    originalForm.setValue(fieldName, data[fieldName]);
    setOpen(false);
  }

  // Updates prompt element on ctrl+enter
  useHotkeys("ctrl+enter", () => form.handleSubmit(onSubmit)(), {
    enableOnFormTags: ["TEXTAREA"],
  });

  // Syncs prompt text with original form
  useEffect(() => {
    form.setValue(fieldName, content);
  }, [content]);

  /*  
      ! Undocumented behaviour
      - Form has to wrap the entire dialog
      - form has to be inside DialogContent
  */
  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" type="button">
            <Tooltip>
              <TooltipTrigger asChild>
                <EnterFullScreenIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Expand {fieldLabel} input</TooltipContent>
            </Tooltip>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[90%]">
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> */}
          <form className="space-y-6">
            <DialogHeader>
              <DialogTitle>Prompt</DialogTitle>
              <DialogDescription>
                Use this dialog to edit the contents of {fieldLabel}.
              </DialogDescription>
            </DialogHeader>
            {/* 
            form here
             */}

            <div className="grid gap-6 py-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {fieldLabel}{" "}
                        <span className="text-sm text-gray-500">
                          (You can use Ctrl+Enter to update)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={18} cols={100} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              {/* Can use submit button, or it submits the original form */}
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Update {fieldLabel}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
