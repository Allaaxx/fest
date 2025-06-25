import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

const products = [
	{
		produto: "Decoração Rústica",
		vendedor: "Eventos Premium",
		categoria: "Decoração",
		preco: "R$ 1.200",
		status: "Aprovado",
		statusColor: "bg-green-100 text-green-800",
	},
	{
		produto: "DJ Premium",
		vendedor: "Som & Cia",
		categoria: "Som",
		preco: "R$ 800",
		status: "Pendente",
		statusColor: "bg-yellow-100 text-yellow-800",
	},
	{
		produto: "Buffet Gourmet",
		vendedor: "Sabores Especiais",
		categoria: "Alimentação",
		preco: "R$ 45/pessoa",
		status: "Aprovado",
		statusColor: "bg-green-100 text-green-800",
	},
	{
		produto: "Iluminação LED",
		vendedor: "Luz & Arte",
		categoria: "Iluminação",
		preco: "R$ 600",
		status: "Rejeitado",
		statusColor: "bg-red-100 text-red-800",
	},
];

export function AdminProductsContent() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-lg font-semibold text-gray-900">
						Gerenciar Produtos
					</h2>
					<p className="text-sm text-gray-500">
						Aprovar e moderar produtos da plataforma
					</p>
				</div>
			</div>
			<Card>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b">
								<tr>
									<th className="text-left p-4 font-medium text-gray-900">
										Produto
									</th>
									<th className="text-left p-4 font-medium text-gray-900">
										Vendedor
									</th>
									<th className="text-left p-4 font-medium text-gray-900">
										Categoria
									</th>
									<th className="text-left p-4 font-medium text-gray-900">
										Preço
									</th>
									<th className="text-left p-4 font-medium text-gray-900">
										Status
									</th>
									<th className="text-left p-4 font-medium text-gray-900">
										Ações
									</th>
								</tr>
							</thead>
							<tbody>
								{products.map((item, index) => (
									<tr
										key={index}
										className="border-b hover:bg-gray-50"
									>
										<td className="p-4">
											<div className="font-medium text-gray-900">
												{item.produto}
											</div>
										</td>
										<td className="p-4 text-gray-500">
											{item.vendedor}
										</td>
										<td className="p-4 text-gray-500">
											{item.categoria}
										</td>
										<td className="p-4 font-medium text-gray-900">
											{item.preco}
										</td>
										<td className="p-4">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.statusColor}`}
											>
												{item.status}
											</span>
										</td>
										<td className="p-4">
											<Button variant="ghost" size="sm">
												Revisar
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
