import { changeService } from "@/api/user/change/change.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { updateApiToken } from "@/lib/features/user";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { dateFormat } from "@/lib/useTime";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

const UserInfo: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const user = useAppSelector((item) => item.user);
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const listInfo = [
    { title: t("user.username"), value: user.userName },
    { title: t("user.email"), value: user.email },
    { title: t("user.scopes"), value: user.scopes },
    { title: t("user.status"), value: user.status },
    { title: t("user.balance"), value: user.balance },
    { title: t("user.creationDate"), value: dateFormat(user.creationDate) },
    {
      title: t("user.modificationDate"),
      value: dateFormat(user.modificationDate),
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.apiToken ?? "");
      toast({
        title: "Copy successful!",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (err) {
      toast({
        title: "Copy failed!",
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white"
        ),
      });
    }
  };

  const changeKey = async () => {
    try {
      setIsLoading(true);
      const res = await changeService.changeKey();
      if (!res.code) {
        toast({
          title: t("alert.success"),
          description: res.message,
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
        dispatch(updateApiToken(res.data));
      } else {
        toast({
          title: t("alert.error"),
          description: res.message,
          variant: "destructive",
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white"
          ),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="p-5 mx-5">
      <CardHeader className="m-5 mb-0 pb-9 border-b-1">
        <CardTitle className="text-center">
          {t("user.accountInformation")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-10">
          <div className="flex mb-5 bg-[#f1faff] justify-between items-center rounded-2xl p-5 border-dashed border-1 border-[#009ef7]">
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">Token</h4>
              <div
                onClick={handleCopy}
                className="text-gray-700 text-sm cursor-pointer"
              >
                {user.apiToken}
              </div>
            </div>
            <Button
              className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
              onClick={changeKey}
              disabled={isLoading}
            >
              {t("changeKey.title")}
            </Button>
          </div>
          {listInfo.map((item) => (
            <div key={item.title} className="grid grid-cols-2">
              <label className="text-[#a1a5b7]">{item.title}</label>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
