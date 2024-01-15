"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import qs from "query-string";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { ArrowRightLeft } from "lucide-react";
import { FormatNumber } from "@/components/formatNumbers";

type ConversionResult = {
    amount: number;
    from: string;
    to: string;
    result: number;
    rate: number;
};

const formSchema = zod.object({
    from: zod.string().nonempty("Please select a unit"),
    to: zod.string().nonempty("Please select a unit"),
    amount: zod.string().nonempty("Please enter an amount"),
});

const MassForm = () => {
    const [availableMass, setAvailableMass] = useState([]);
    const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: "Gramme(s)",
            to: "Kilogramme(s)",
            amount: "1",
        },
    });

    useEffect(() => {
        const fetchAvailableMass = async () => {
            try {
                const response = await axios.get("/api/mass");
                setAvailableMass(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAvailableMass();
    }, []);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/convert/mass",
            });
            const resp = await axios.post(url, values);
            setConversionResult(resp.data);

            form.reset(
                {
                    ...values,
                    amount: parseFloat(values.amount.replace(",", ".")).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }),
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const swapValues = () => {
        const from = form.getValues("from");
        const to = form.getValues("to");

        form.setValue("from", to);
        form.setValue("to", from);
    };

    return (
        <Card className="shadow-2xl">
            <CardHeader>
                <CardTitle>Convertisseur de Masses</CardTitle>
                <CardDescription>Nous utilisons les taux fournis par des wikis.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex space-x-4 items-end">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            Montant
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                style={{
                                                    width: "10rem"
                                                }}
                                                defaultValue={Number(field.value.replace(",", ".")).toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            De
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger
                                                    style={{
                                                        width: "20rem"
                                                    }}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {availableMass.map((currency) => (
                                                    <SelectItem key={currency} value={currency}>
                                                        <p>{currency}</p>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="outline" onClick={swapValues}><ArrowRightLeft /></Button>
                            <FormField
                                control={form.control}
                                name="to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            Vers
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger
                                                    style={{
                                                        width: "20rem"
                                                    }}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {availableMass.map((currency) => (
                                                    <SelectItem key={currency} value={currency}>
                                                        <p>{currency}</p>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-5 flex-row-reverse transition-all">
                            <Button type="submit" variant="default" disabled={isLoading}>
                                Convertir
                            </Button>
                            {conversionResult && <div>
                                <p className="font-bold text-gray-500">
                                    {conversionResult.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                    })} {conversionResult.from} =
                                </p>
                                <p className="font-bold text-2xl mt-2">
                                    <FormatNumber number={conversionResult.result} /> {conversionResult.to}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    1 {conversionResult.from} = {conversionResult.rate.toString().replace(".", ",")} {conversionResult.to}
                                </p>
                            </div>}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}

export default MassForm;