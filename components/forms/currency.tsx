"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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
    CardFooter,
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
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { ArrowRightLeft } from "lucide-react";

const formSchema = zod.object({
    from: zod.string().nonempty("Please select a currency"),
    to: zod.string().nonempty("Please select a currency"),
    amount: zod.string().nonempty("Please enter an amount"),
});

const CurrencyForm = () => {
    const [availableCurrencies, setAvailableCurrencies] = useState([]);
    const [conversionResult, setConversionResult] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: "EUR",
            to: "USD",
            amount: "1,00",
        },
    });

    useEffect(() => {
        const fetchAvailableCurrencies = async () => {
            try {
                const response = await axios.get("/api/currencies");
                setAvailableCurrencies(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAvailableCurrencies();
    }, []);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/convert",
            });
            const resp = await axios.post(url, values);
            setConversionResult(resp.data);

            form.reset(
                {
                    ...values,
                    amount: parseFloat(values.amount).toLocaleString(undefined, {
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

    function formatNumber(number: number) {
        const parts = number.toString().split('.');
        const mainPart = `${parts[0]}.${parts[1].substring(0, 2)}`;
        const decimalPart = parts[1].substring(2);

        return (
            <>
                {mainPart}
                <span style={{ color: 'grey' }}>{decimalPart}</span>
            </>
        );
    }

    return (
        <Card className="shadow-2xl">
            <CardHeader>
                <CardTitle>Convertisseur de devises</CardTitle>
                <CardDescription>Nous utilisons le taux de marché moyen pour notre convertisseur.</CardDescription>
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
                                                value={field.value.toLocaleString(undefined, {
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
                                                {availableCurrencies.map((currency) => (
                                                    <SelectItem value={currency[0]}>
                                                        <div className="flex gap-1">
                                                            <Flag code={currency[2]} style={{
                                                                width: "1.5rem"
                                                            }} />
                                                            <p>{currency[0]} - {currency[1]}</p>
                                                        </div>
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
                                                {availableCurrencies.map((currency) => (
                                                    <SelectItem value={currency[0]}>
                                                        <div className="flex gap-1">
                                                            <Flag code={currency[2]} style={{
                                                                width: "1.5rem"
                                                            }} />
                                                            <p>{currency[0]} - {currency[1]}</p>
                                                        </div>
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
                                    {formatNumber(conversionResult.result)} {conversionResult.to}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    1 {conversionResult.from} = {conversionResult.rate.toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                    })} {conversionResult.to}
                                </p>
                            </div>}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}

export default CurrencyForm;